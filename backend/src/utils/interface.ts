export interface IMember {
    name: string,
    id: number,
    is_active: boolean,
    user_name: string,
    email: string, 
    avatar: string, 
    role: string, 
    teams ?: string[]
}