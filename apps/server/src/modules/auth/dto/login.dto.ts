import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Sanitize, Trim } from 'class-sanitizer';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Sanitize(Trim)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @Sanitize(Trim)
  password!: string;
}
