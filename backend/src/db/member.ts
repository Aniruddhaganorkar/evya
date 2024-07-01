import { off } from 'process';
import { IMember } from '../utils/interface.js';
import supabase from './db.js'

export async  function createMemeber(member:IMember) {
        return  supabase.from('members').insert(member).select();
}

export async function deleteMember(id: number) {
    return supabase.from('members').update({is_active: false}).eq('id', id).select();
}

export async function deleteSelectedMember(ids: number[]) {
    return supabase.from('members').update({is_active: false}).in('id', ids).select();
}

export async function getMemberById(id: number) {
    return supabase
    .from('members')
    .select('*')
    .eq('id', id)
}

export async function getMember(offset: number, limit: number) {
   return supabase
    .from('members')
    .select('*')
    .range(offset, limit+offset-1);
}

export async function updateMember(id: number, member: Partial<IMember>) {
    return supabase.from('members').update(member).eq('id', id).select();
}


export async function totalMember() {
    return supabase.from('members').select('*', { count: 'exact', head: true })
}