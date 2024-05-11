import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('http://127.0.0.1:3000/api/v1/transactions', (req) => {
    return HttpResponse.json([
      {
        id: "bf8e0573-1e02-4798-a48e-3d760b89f47c",
        category: "Развлечения",
        amount: 258,
        date: "string",
        comment: "За такси утром",
        type: "Expense",
        user_id: "d2d7427e-c143-4854-8d59-c9a60b60e099"
      }
    ])
  }),
]