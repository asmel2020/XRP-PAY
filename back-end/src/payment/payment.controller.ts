import { Controller, Post, Body, Param, Sse, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Observable } from 'rxjs';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Auth(ValidRoles.USER, ValidRoles.ADMIN)
  create(@Body() createPaymentDto: CreatePaymentDto,@GetUser() user:any) {
    return this.paymentService.create(createPaymentDto,user);
  }


  @Get(":id")
  findOne(@Param() {id}: any) {
    return this.paymentService.findOne(id);
  }


  @Sse('sse/:id')
  sendNotification(
    @Param() { id }: Record<string, string>,
  ): Promise<Observable<any>> {
    return this.paymentService.handleConnection(id);
  }
}
