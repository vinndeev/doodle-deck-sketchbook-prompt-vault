export type Difficulty = 'easy' | 'medium' | 'hard'
export type Style = 'pencil' | 'ink' | 'watercolor' | 'digital'
export type Status = 'untried' | 'in progress' | 'done'
export interface Prompt {
  id: string
  text: string
  difficulty: Difficulty
  style: Style
  status: Status
  createdAt: number
}
