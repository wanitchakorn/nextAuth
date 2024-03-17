import { PrismaClient } from '@prisma/client'
import bcrytp from 'bcrypt'

const prisma = new PrismaClient()

export async function POST (request) {
    try {
        const { name, email, password } = await request.json()
        const hashedPassword = bcrytp.hashSync(password, 10)
        const newUser = await prisma.user.create({
            data: { 
                name, 
                email,
                password: hashedPassword
              },
        })
        return Response.json({ 
            message: 'User created successfully',
            data: {
                newUser
            }
        })
    }catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}