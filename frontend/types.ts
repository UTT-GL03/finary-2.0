export type User = {
  user_id: string;
  user: string;
};

export type Expense = {
    "id": string,
    "user_id": string,
    "created_at": string,
    "amount": number,
    "category": string
  }

export type Data = {
    users : User[],
    expenses : Expense[]
}