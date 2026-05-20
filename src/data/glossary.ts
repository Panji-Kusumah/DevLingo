/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GlossaryTerm {
  term: string;
  definition: string;
  translation: string;
  category: 'Common' | 'Agile' | 'Code' | 'Infrastructure' | 'Career' | 'OOP';
  codeSnippet?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Blocker',
    definition: 'An obstacle that prevents a task from being completed.',
    translation: 'Penghambat atau kendala yang menghentikan progres pekerjaan.',
    category: 'Agile',
    codeSnippet: '// Jira API check\nif (task.status === "blocked") {\n  console.log("Cannot proceed: " + task.blockerReason);\n}'
  },
  {
    term: 'Daily Standup',
    definition: 'A short daily meeting identifying progress and obstacles.',
    translation: 'Rapat harian singkat untuk melaporkan progres dan kendala.',
    category: 'Agile',
    codeSnippet: 'const standup = {\n  yesterday: "Fixed login bug",\n  today: "Implementing glossary",\n  blockers: "None"\n};'
  },
  {
    term: 'Pull Request (PR)',
    definition: 'A method of submitting contributions to an open development project.',
    translation: 'Penghasutan untuk menggabungkan perubahan kode ke cabang utama.',
    category: 'Code',
    codeSnippet: 'git checkout -b feature/auth\ngit add .\ngit commit -m "Add JWT auth"\ngit push origin feature/auth\n# Open PR on GitHub'
  },
  {
    term: 'Refactoring',
    definition: 'Restructuring existing computer code without changing its external behavior.',
    translation: 'Proses mengubah struktur kode tanpa mengubah fungsinya.',
    category: 'Code',
    codeSnippet: '// Before refactor\nfunction calc(a, b) { return a + b; }\n\n// After refactor\nconst add = (num1, num2) => num1 + num2;'
  },
  {
    term: 'Deployment',
    definition: 'All of the activities that make a software system available for use.',
    translation: 'Proses merilis aplikasi agar bisa digunakan oleh pengguna.',
    category: 'Infrastructure',
    codeSnippet: 'npm run build\nfirebase deploy --only hosting'
  },
  {
    term: 'Technical Debt',
    definition: 'The implied cost of additional rework caused by choosing an easy solution now instead of a better approach.',
    translation: 'Utang teknis; konsekuensi dari memilih solusi cepat daripada solusi yang benar.',
    category: 'Code',
    codeSnippet: '// TODO: Replace this hack with a proper API call later\nconst data = localStorage.getItem("temp_data");'
  },
  {
    term: 'Endpoint',
    definition: 'A specific URL where an API receives requests.',
    translation: 'Titik akses akhir pada API untuk menerima permintaan.',
    category: 'Infrastructure',
    codeSnippet: 'app.get("/api/v1/users", (req, res) => {\n  res.json(users);\n});'
  },
  {
    term: 'Stakeholder',
    definition: 'A person with an interest or concern in something, especially a business.',
    translation: 'Pihak-pihak yang berkepentingan dalam sebuah proyek.',
    category: 'Career',
    codeSnippet: 'const stakeholders = ["Product Manager", "CEO", "End Users"];\nstakeholders.forEach(person => notifyUpdate(person));'
  },
  {
    term: 'Boolean',
    definition: 'A data type that has one of two possible values (usually true and false).',
    translation: 'Tipe data yang hanya memiliki dua nilai: benar atau salah.',
    category: 'Code',
    codeSnippet: 'const isLoggedIn = true;\nconst hasPermission = false;'
  },
  {
    term: 'Middleware',
    definition: 'Software that acts as a bridge between an operating system or database and applications.',
    translation: 'Perangkat lunak penengah antara sistem operasi/database dan aplikasi.',
    category: 'Infrastructure',
    codeSnippet: 'app.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n});'
  },
  {
    term: 'Payload',
    definition: 'The essential data being transmitted in an API request or response (excluding headers).',
    translation: 'Data utama yang dikirimkan dalam permintaan atau respons API.',
    category: 'Code',
    codeSnippet: 'const payload = {\n  userId: 123,\n  action: "UPDATE_PROFILE",\n  timestamp: Date.now()\n};'
  },
  {
    term: 'Scalability',
    definition: 'The capability of a system to handle a growing amount of work by adding resources.',
    translation: 'Kemampuan sistem untuk menangani beban kerja yang meningkat.',
    category: 'Infrastructure',
    codeSnippet: '// AWS Auto-scaling config (pseudo-code)\nscaling_group.configure({\n  min_instances: 2,\n  max_instances: 10,\n  cpu_threshold: "70%"\n});'
  },
  {
    term: 'Throughput',
    definition: 'The amount of data or number of processes that can be handled within a specific period.',
    translation: 'Jumlah data atau proses yang dapat ditangani dalam jangka waktu tertentu.',
    category: 'Infrastructure',
    codeSnippet: 'const throughput = totalRequests / timeInSeconds;\nconsole.log(`${throughput} req/sec`);'
  },
  {
    term: 'Concurrency',
    definition: 'The ability of different parts or units of a program to be executed out-of-order without affecting the outcome.',
    translation: 'Kemampuan program untuk menjalankan beberapa bagian secara bersamaan.',
    category: 'Code',
    codeSnippet: 'await Promise.all([\n  fetchUsers(),\n  fetchSettings(),\n  fetchPosts()\n]);'
  },
  {
    term: 'Asynchronous',
    definition: 'Operations that run independently of the main program flow, not blocking the execution.',
    translation: 'Operasi yang berjalan secara mandiri dan tidak menghentikan alur utama.',
    category: 'Code',
    codeSnippet: 'async function fetchData() {\n  const res = await fetch("https://api.devlingo.id/data");\n  return res.json();\n}'
  },
  {
    term: 'Microservices',
    definition: 'An architectural style that structures an application as a collection of small, autonomous services.',
    translation: 'Arsitektur aplikasi yang terdiri dari layanan-layanan kecil yang mandiri.',
    category: 'Infrastructure',
    codeSnippet: '// Communication via message broker\nrabbitmq.publish("order_created", { id: 101 });'
  },
  {
    term: 'Legacy Code',
    definition: 'Older computer code which is still in use but may be difficult to maintain or integrate.',
    translation: 'Kode lama yang masih digunakan namun biasanya sulit dipelihara.',
    category: 'Code',
    codeSnippet: '// Dangerous area: Do not touch without unit tests\nwindow.oldVar_GlobalFlag_Fix = true;'
  },
  {
    term: 'Bug',
    definition: 'An error, flaw, failure or fault in a computer program that causes it to produce an incorrect or unexpected result.',
    translation: 'Kesalahan atau kegagalan pada program yang menyebabkan hasil tidak terduga.',
    category: 'Code',
    codeSnippet: '// Logic bug example\nfor (let i = 0; i <= arr.length; i++) { \n  // index out of bounds error\n  console.log(arr[i]); \n}'
  },
  {
    term: 'Onboarding',
    definition: 'The process of integrating a new employee into an organization.',
    translation: 'Proses pengenalan dan integrasi karyawan baru ke perusahaan.',
    category: 'Career',
    codeSnippet: 'const newEngineer = new Developer("Budi");\nnewEngineer.setupWorkspace();\nnewEngineer.readDocumentation();'
  },
  {
    term: 'Backlog',
    definition: 'An accumulation of uncompleted work or matters needing to be dealt with.',
    translation: 'Daftar akumulasi pekerjaan yang belum diselesaikan.',
    category: 'Agile',
    codeSnippet: 'const backlog = [\n  { task: "Fix CSS", priority: "Low" },\n  { task: "Database Migrations", priority: "High" }\n];'
  },
  {
    term: 'Sprint',
    definition: 'A set period of time during which specific work has to be completed and made ready for review.',
    translation: 'Siklus waktu singkat (biasanya 2-4 minggu) untuk menyelesaikan pekerjaan.',
    category: 'Agile',
    codeSnippet: 'const currentSprint = {\n  duration: "2 weeks",\n  tasks: ["UI Refactor", "API Integration"],\n  velocity: 15\n};'
  },
  {
    term: 'Repository',
    definition: 'A central location in which data is stored and managed.',
    translation: 'Tempat penyimpanan pusat untuk data atau kode sumber.',
    category: 'Code',
    codeSnippet: 'git clone https://github.com/user/devlingo.git'
  },
  {
    term: 'Integration',
    definition: 'The process of combining different software modules into a single system.',
    translation: 'Proses menggabungkan berbagai modul perangkat lunak menjadi satu sistem.',
    category: 'Infrastructure',
    codeSnippet: 'import { auth } from "./services/auth";\nimport { db } from "./services/database";\n\nconst app = connect(auth, db);'
  },
  {
    term: 'Stack Trace',
    definition: 'A report that provides information about the active stack frames at a certain point in time during the execution of a program.',
    translation: 'Laporan yang berisi urutan pemanggilan fungsi saat terjadi kesalahan.',
    category: 'Code',
    codeSnippet: 'try {\n  main();\n} catch (e) {\n  console.error(e.stack);\n}'
  },
  {
    term: 'Callback',
    definition: 'A function that is passed as an argument to another function and is executed after some operation has been completed.',
    translation: 'Fungsi yang dikirim sebagai argumen ke fungsi lain untuk dijalankan nanti.',
    category: 'Code',
    codeSnippet: 'fs.readFile("config.json", (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});'
  },
  {
    term: 'Promise',
    definition: 'An object representing the eventual completion or failure of an asynchronous operation.',
    translation: 'Objek yang mewakili keberhasilan atau kegagalan operasi asinkron di masa depan.',
    category: 'Code',
    codeSnippet: 'const myPromise = new Promise((resolve) => {\n  setTimeout(() => resolve("Success!"), 1000);\n});'
  },
  {
    term: 'Thread',
    definition: 'The smallest unit of execution within a process.',
    translation: 'Unit eksekusi terkecil dalam sebuah proses.',
    category: 'Code',
    codeSnippet: '// Node.js worker thread\nconst { Worker } = require("worker_threads");\nnew Worker("./task.js");'
  },
  {
    term: 'Deadlock',
    definition: 'A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource.',
    translation: 'Kondisi di mana dua proses atau lebih saling menunggu dan tidak bisa lanjut.',
    category: 'Code',
    codeSnippet: '// Process A waits for resource 1 (held by B)\n// Process B waits for resource 2 (held by A)'
  },
  {
    term: 'Garbage Collection',
    definition: 'A form of automatic memory management that identifies and deallocates objects that are no longer in use.',
    translation: 'Manajemen memori otomatis yang menghapus objek yang sudah tidak terpakai.',
    category: 'Infrastructure',
    codeSnippet: '// Runtime automatically frees memory\nlet user = { name: "Budi" };\nuser = null; // object ready for GC'
  },
  {
    term: 'Dependency Injection',
    definition: 'A design pattern in which an object receives other objects that it depends on.',
    translation: 'Pola desain di mana objek menerima dependensi dari luar.',
    category: 'Code',
    codeSnippet: 'class UserAPI {\n  constructor(httpClient) {\n    this.http = httpClient; // injected\n  }\n}'
  },
  {
    term: 'Load Balancer',
    definition: 'A device or software that distributes network or application traffic across a cluster of servers.',
    translation: 'Teknologi untuk membagi beban trafik ke beberapa server.',
    category: 'Infrastructure',
    codeSnippet: '# Nginx config\nupstream my_app {\n  server 10.0.0.1;\n  server 10.0.0.2;\n}'
  },
  {
    term: 'Containerization',
    definition: 'Encapsulating an application in a container with its own operating environment (like Docker).',
    translation: 'Proses membungkus aplikasi beserta lingkungannya ke dalam kontainer.',
    category: 'Infrastructure',
    codeSnippet: 'FROM node:18\nWORKDIR /app\nCOPY . .\nCMD ["npm", "start"]'
  },
  {
    term: 'Orchestration',
    definition: 'The automated configuration, management, and coordination of computer systems and software (like Kubernetes).',
    translation: 'Otomatisasi pengaturan dan koordinasi sistem komputer.',
    category: 'Infrastructure',
    codeSnippet: 'apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: "devlingo" }'
  },
  {
    term: 'Latency',
    definition: 'The time it takes for a data packet to travel from its source to its destination.',
    translation: 'Waktu yang dibutuhkan data untuk sampai ke tujuan (jeda waktu).',
    category: 'Infrastructure',
    codeSnippet: 'console.time("API Call");\nawait fetch(url);\nconsole.timeEnd("API Call"); // e.g. 150ms'
  },
  {
    term: 'Abstraction',
    definition: 'Hiding the complex reality while exposing only the necessary parts.',
    translation: 'Menyembunyikan kerumitan detail dan hanya menampilkan fungsi penting.',
    category: 'OOP',
    codeSnippet: 'abstract class Shape {\n  abstract calculateArea(): number;\n}'
  },
  {
    term: 'Encapsulation',
    definition: 'Grouping data and the methods that operate on that data into a single unit.',
    translation: 'Pembungkusan data dan metode ke dalam satu unit (kelas).',
    category: 'OOP',
    codeSnippet: 'class User {\n  private password;\n  checkPassword(p) { return this.password === p; }\n}'
  },
  {
    term: 'Polymorphism',
    definition: 'The ability of different objects to respond to the same message in different ways.',
    translation: 'Kemampuan objek yang berbeda untuk menanggapi perintah yang sama.',
    category: 'OOP',
    codeSnippet: 'shapes.forEach(s => s.draw()); // squares, circles all draw'
  },
  {
    term: 'Immutable',
    definition: 'An object whose state cannot be modified after it is created.',
    translation: 'Objek yang nilainya tidak dapat diubah setelah dibuat.',
    category: 'Code',
    codeSnippet: 'const config = Object.freeze({ api: "https://api.com" });\nconfig.api = "hacked"; // does nothing'
  },
  {
    term: 'Parallelism',
    definition: 'Executing multiple tasks simultaneously, typically on multiple processors.',
    translation: 'Menjalankan beberapa tugas secara bersamaan pada prosesor yang berbeda.',
    category: 'Infrastructure',
    codeSnippet: 'cluster.fork(); // Spawn worker on separate CPU core'
  },
  {
    term: 'Race Condition',
    definition: 'An undesirable situation that occurs when a device or system attempts to perform two or more operations at the same time.',
    translation: 'Kondisi di mana hasil akhir bergantung pada urutan eksekusi yang tidak teratur.',
    category: 'Code',
    codeSnippet: '// Two processes incrementing same counter\ncount = count + 1;'
  },
  {
    term: 'Normalization',
    definition: 'The process of organizing data in a database efficiently.',
    translation: 'Proses pengorganisasian data dalam database agar efisien.',
    category: 'Code',
    codeSnippet: '-- Split one table into two: Users and Countries\nSELECT * FROM Users JOIN Countries ON Users.countryId = Countries.id;'
  },
  {
    term: 'Schema',
    definition: 'The structure that defines the organization of data in a database.',
    translation: 'Struktur yang mendefinisikan organisasi data dalam database.',
    category: 'Code',
    codeSnippet: 'const UserSchema = new Schema({\n  name: String,\n  email: { type: String, unique: true }\n});'
  },
  {
    term: 'Injection',
    definition: 'A type of security vulnerability where an attacker provides untrusted input to a program.',
    translation: 'Celah keamanan di mana penyerang memasukkan input berbahaya.',
    category: 'Infrastructure',
    codeSnippet: '// SQL Injection vulnerable code\nconst query = "SELECT * FROM users WHERE name = " + userInput;'
  },
  {
    term: 'Cryptography',
    definition: 'The practice and study of techniques for secure communication.',
    translation: 'Studi tentang teknik komunikasi aman (enkripsi).',
    category: 'Infrastructure',
    codeSnippet: 'const hash = crypto.createHash("sha256").update(pass).digest("hex");'
  },
  {
    term: 'Proxy',
    definition: 'A server that sits between a client and another server.',
    translation: 'Server perantara antara pengguna dan server tujuan.',
    category: 'Infrastructure',
    codeSnippet: 'const proxy = new Proxy(target, {\n  get: (t, prop) => console.log(`Accessing ${prop}`)\n});'
  }
];
