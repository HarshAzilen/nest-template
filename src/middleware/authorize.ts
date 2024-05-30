import { Inject, Injectable, NestMiddleware, forwardRef } from '@nestjs/common';
import { caching } from 'cache-manager';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../modules/user/user.service';
import { AuthMessages } from '../utils/constants/messages/auth.messages';
import { RoleService } from '../modules/role/role.service';

export const memoryCache = caching('memory', {
  max: 100,
  ttl: 10 * 60 * 1000,
});

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => UserService))
    private UserService: UserService,
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader: string | undefined = req.headers.authorization;
      const [tokenType, token] = authHeader ? authHeader?.split(' ') : [];

      if (tokenType === 'Bearer') {
        const decoded: any = jwt.decode(token);

        if (!decoded || typeof decoded === 'string' || !('id' in decoded)) {
          return res.status(401).json({ code: '401', message: AuthMessages.UNAUTHORIZED });
        }
        const key = `user_${decoded.id}`;
        const cachedUser = await (await memoryCache).get(key);
        const ttl = 10 * 60 * 1000;
        if (cachedUser) {
          req.user = cachedUser;
          next();
        } else {
          const user = await this.UserService.findUserWithRole(decoded.id);
          if (!user) {
            return res.status(401).json({ code: '401', message: AuthMessages.USER_NOT_EXIST });
          }
          await (await memoryCache).set(key, user, ttl);
          req.user = user;
          next();
        }
      } else {
        return res.status(401).json({ code: '401', message: AuthMessages.UNAUTHORIZED });
      }
    } catch (error) {
      return res.status(401).json({ code: '401', message: AuthMessages.UNAUTHORIZED });
    }
  }
}
