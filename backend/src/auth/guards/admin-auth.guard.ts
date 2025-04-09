import {
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const { user } = context.switchToHttp().getRequest();
    if (user.role !== 'Admin') {
      throw new ForbiddenException('Admin access only');
    }

    return true;
  }
}
