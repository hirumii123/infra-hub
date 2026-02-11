import { exec } from 'child_process';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST() {
  const targetDir = path.resolve(process.cwd(), '..', 'my-wa-server');
  
  console.log("Mencoba menjalankan di directory:", targetDir);

  // Kita gunakan Promise agar Next.js menunggu proses exec selesai
  const runPm2 = () => {
    return new Promise((resolve, reject) => {
      exec('pm2 start server.js --name my-wa-server', { 
        cwd: targetDir,
        shell: 'powershell.exe' 
      }, (error, stdout, stderr) => {
        if (error) {
          console.error("--- ERROR DETECTED ---");
          reject({ message: error.message, stderr });
          return;
        }
        resolve(stdout);
      });
    });
  };

  try {
    const output = await runPm2();
    console.log("Output:", output);
    return NextResponse.json({ status: 'success', output });
  } catch (err) {
    console.error("Message:", err.message);
    return NextResponse.json(
      { status: 'error', message: err.message, detail: err.stderr },
      { status: 500 }
    );
  }
}