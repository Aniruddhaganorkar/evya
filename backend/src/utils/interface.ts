export interface IMember {
    name: string,
    id: number,
    isActive: boolean,
    userName: string,
    email: string, 
    avatar: string, 
    role: string, 
    teams ?: string[]
}