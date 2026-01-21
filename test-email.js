// test-email.js
const nodemailer = require('nodemailer');

async function main() {
  // --- ISI DATA ZIMBRA DI SINI SECARA MANUAL ---
  const config = {
    host: 'mail.ainosi.com',  // Ganti host zimbra
    port: 587,                  // Coba 587 dulu, kalau gagal coba 465
    user: 'hilmy@ainosi.com',  // Email lengkap
    pass: 'Hirumi123+'          // Password login zimbra
  };
  // ---------------------------------------------

  console.log(`⏳ Mencoba koneksi ke ${config.host}:${config.port}...`);

  // Tentukan secure berdasarkan port
  // Port 465 = true
  // Port 587 = false
  const isSecure = config.port === 465;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: isSecure, 
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      // Penting buat Zimbra kantor: Jangan tolak sertifikat self-signed
      rejectUnauthorized: false
    },
    // Debugging options
    logger: true,
    debug: true
  });

  try {
    // 1. Cek Koneksi Login dulu
    await transporter.verify();
    console.log('✅ LOGIN BERHASIL! Server siap menerima pesan.');

    // 2. Coba Kirim Email Test
    const info = await transporter.sendMail({
      from: config.user,
      to: config.user, // Kirim ke diri sendiri aja
      subject: 'Test Koneksi Zimbra',
      text: 'Halo, ini tes dari script Node.js!',
    });

    console.log('✅ EMAIL TERKIRIM!', info.messageId);

  } catch (error) {
    console.error('❌ GAGAL TOTAL:');
    console.error(error);
  }
}

main();