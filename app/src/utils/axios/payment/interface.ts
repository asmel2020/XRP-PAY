export interface PaymentRespon {
  address: string;
  value: string;
  concepto: string;
  status: 'COMPLETE' | 'ACTIVATED' | 'CANCELLED';
}

