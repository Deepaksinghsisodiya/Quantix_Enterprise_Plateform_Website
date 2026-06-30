import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId');
  if (!merchantId) {
    return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
  }

  try {
    // Resolve absolute path to the helper script to make execution location-independent
    const scriptPath = path.join(process.cwd(), 'src/app/api/dev/otp/get_otp.py');
    const output = execSync(`python "${scriptPath}" "${merchantId}"`, { encoding: 'utf-8' }).trim();
    
    if (output.startsWith("ERROR:")) {
      return NextResponse.json({ error: output }, { status: 500 });
    }
    
    return NextResponse.json({ otp: output });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
