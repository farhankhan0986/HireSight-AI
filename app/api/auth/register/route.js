import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {connectDB} from '../../../../lib/db';
import User from '../../../../models/User';

export async function POST(req) {
    await connectDB();

    const {name, email, password, role} = await req.json();

    if(!name || !email || !password) {
        return NextResponse.json({error: "Please provide all required fields"}, {status: 400});
    }

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return NextResponse.json({error: "User with this email already exists"}, {status: 409});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const safeRole = role === "recruiter" ? "recruiter" : "candidate";


    await User.create({
        name, 
        email,
        password: hashedPassword,
        role: safeRole
    })

    return NextResponse.json({message: "User registered successfully"}, {status: 201});

}
