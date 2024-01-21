
export interface userRespon {
  amount: string
  payments: Payment[]
  paymentsCount: PaymentsCount
}

export interface Payment {
  id: string
  value: string
  status: "COMPLETE" |"ACTIVATED" | "CANCELLED" ;
  concepto: string,
  createdAt:string
}

export interface PaymentsCount {
  completaCount: number
  activatedCount: number
  cancelledCount: number
}
