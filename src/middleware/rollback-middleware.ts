// import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { UserService } from '../modules/user/user.service';
// import { Reflector } from '@nestjs/core';
// import { AuthMessages } from 'src/utils/constants/messages/auth.messages';

// @Injectable()
// export class RoleMiddleware implements NestMiddleware {
//   constructor(
//     private readonly reflector: Reflector, // Inject Reflector to access metadata
//   ) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       // Retrieve user roles from the request object
//       const userRoles = req.user.role;

//       // Get roles defined for the current route using Reflector
//       const allowedRoles = this.reflector.get<string[]>('roles', req.route?.stack[0]?.handle);

//       // Check if any of the user's roles match the roles specified for the requested route
//       const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

//       if (!hasPermission) {
//         return res.status(401).json({ code: '401', message: AuthMessages.UNAUTHORIZED });
//       }

//       // User has the required role, allow the request to proceed
//       next();
//     } catch (error) {
//       return res.status(401).json({ code: '401', message: AuthMessages.UNAUTHORIZED });
//     }
//   }
// }
