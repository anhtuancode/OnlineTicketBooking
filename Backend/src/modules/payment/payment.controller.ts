import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(":id")
  async payment(@Body() body: { amount: number; currency: string }) {
    const { amount, currency } = body;
    return this.paymentService.payment(amount, currency);
  }
}
