import { ParsedQs } from 'qs';
import {createMemeber, deleteMember, deleteSelectedMember, getMember, getMemberById, totalMember, updateMember} from '../db/member.js'
import { IMember } from '../utils/interface.js';

function validateMembers(member: Partial<IMember>) {
    const errorMessage = []
    if(member.isActive && typeof(member.isActive) !== 'boolean')    {
        errorMessage.push(`isActive should be boolean`);
    }else {
        member.is_active = member.isActive;
        delete member.isActive;
    }
    if(!member.name && !member.id)  {
        errorMessage.push('Name is mandatory');
    }
    if(!member.role && !member.id)  {
        errorMessage.push('Role is mandatory');
    }
    if(!member.email && !member.id)  {
        errorMessage.push('Email is mandatory');
    }
    else if(member.email && !isValidMail(member.email))   errorMessage.push( 'Please Enter valid mail id')
    if(!member.userName && !member.id)  {
         errorMessage.push('userName is mandatory');
    }
    if(member.userName) {
        member.user_name = member.userName
        delete member.userName
    }
    return errorMessage;
}

export async function createMemebers(members: IMember) {
    
    const errorMessage = validateMembers(members);
    if(errorMessage.length){
        throw {
            message: errorMessage,
            status: 409
        }
    }
    const {data, error} = await createMemeber(members); 
    if(error) {
        throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    return data
}

export async function deleteMembers(id: number) {
    if(!id) {
        throw {
            status: 409,
            message: 'Invalid member id'
        }
    }
    const { data, error} = await deleteMember(id);
    
    if(!data?.length) {
        throw {
            message: `Records not found`,
            status: 404
        }
    }
    if(error) {
         throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    return data;
}

export async function deleteSelectedMembers(body: { members: any; }) {
    
    const ids = body.members;
    const { data, error} = await deleteSelectedMember(ids);
    
    if(!data?.length) {
        throw {
            message: `Records not found`,
            status: 404
        }
    }
    if(error) {
         throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    return {members: data};
}

export async function getMembersById(id: number) {
    
    const {data, error} = await getMemberById(id);
    if(error) {
         throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    if(!data?.length) {
        throw {
            message: `Records not found`,
            status: 404
        }
    }

    return data
}

export async function updateMembers(id: number, member: Partial<IMember>) {
    const {data, error} = await updateMember(id, member);
    if(error) {
         throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    
    if(!data?.length) {
        throw {
            message: `Records not found`,
            status: 404
        }
    }
    return data
}

export async function getMembers(query: ParsedQs) {
    const limit = query?.limit ? Number(query.limit) : 10;
    const offset = query?.offset  ? Number(query.offset) : 0;
    const {data, error} = await getMember( offset, limit);
    if(error) {
         throw {
            message: `Internal Server Error`,
            status: 500
        }
    }
    const {count} = await totalMember();
    return {members: data, totalMembers:count}
}

function isValidMail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
