const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'Kotresh893@', // Replace with your MySQL password
  database: 'front_desk', // Replace with your database name
});

const doctor = [
  { "name": "Dr. Navy Doe", "course": "BMMS", "specialization": "Cardiology", "ratings": 4.3, "description": "Experienced cardiologist with over 10 years of practice.", "location": "Room 101", "availability": "free" },
  { "name": "Dr. Alice Smith", "course": "MBBS", "specialization": "Neurology", "ratings": 4.8, "description": "Skilled neurologist specializing in neurodegenerative diseases.", "location": "Room 102", "availability": "busy" },
  { "name": "Dr. John Evans", "course": "MD", "specialization": "Orthopedics", "ratings": 4.5, "description": "Orthopedic surgeon with expertise in joint replacements.", "location": "Room 103", "availability": "off-duty" },
  { "name": "Dr. Sarah Parker", "course": "DNB", "specialization": "Pediatrics", "ratings": 4.6, "description": "Compassionate pediatrician treating children of all ages.", "location": "Room 104", "availability": "free" },
  { "name": "Dr. Michael Brown", "course": "MBBS", "specialization": "General Surgery", "ratings": 4.7, "description": "General surgeon with a focus on minimally invasive surgery.", "location": "Room 105", "availability": "busy" },
  { "name": "Dr. Linda Harris", "course": "MBBS", "specialization": "Endocrinology", "ratings": 4.4, "description": "Expert in managing hormonal imbalances and diabetes.", "location": "Room 106", "availability": "free" },
  { "name": "Dr. Steven Lee", "course": "MBBS", "specialization": "Dermatology", "ratings": 4.2, "description": "Experienced dermatologist specializing in skin conditions.", "location": "Room 107", "availability": "off-duty" },
  { "name": "Dr. Emma Wilson", "course": "DGO", "specialization": "Gynecology", "ratings": 4.6, "description": "Experienced gynecologist with a focus on women's health.", "location": "Room 108", "availability": "free" },
  { "name": "Dr. David Clark", "course": "MD", "specialization": "Urology", "ratings": 4.1, "description": "Specializing in the treatment of urinary tract and kidney diseases.", "location": "Room 109", "availability": "busy" },
  { "name": "Dr. Olivia Lewis", "course": "MBBS", "specialization": "Rheumatology", "ratings": 4.5, "description": "Rheumatologist treating autoimmune diseases and arthritis.", "location": "Room 110", "availability": "off-duty" },
  { "name": "Dr. Mark Turner", "course": "MD", "specialization": "Ophthalmology", "ratings": 4.7, "description": "Experienced ophthalmologist with expertise in cataract surgery.", "location": "Room 111", "availability": "free" },
  { "name": "Dr. Jessica Moore", "course": "MBBS", "specialization": "Pulmonology", "ratings": 4.3, "description": "Pulmonologist specializing in respiratory diseases and asthma.", "location": "Room 112", "availability": "busy" },
  { "name": "Dr. William Taylor", "course": "MBBS", "specialization": "Nephrology", "ratings": 4.4, "description": "Nephrologist focused on kidney diseases and dialysis.", "location": "Room 113", "availability": "off-duty" },
  { "name": "Dr. Abigail Martin", "course": "MD", "specialization": "Oncology", "ratings": 4.9, "description": "Oncologist with a compassionate approach to cancer care.", "location": "Room 114", "availability": "free" },
  { "name": "Dr. James Robinson", "course": "MBBS", "specialization": "Psychiatry", "ratings": 4.6, "description": "Psychiatrist treating mental health disorders with a holistic approach.", "location": "Room 115", "availability": "busy" },
  { "name": "Dr. Grace Thompson", "course": "DNB", "specialization": "Hematology", "ratings": 4.5, "description": "Hematologist specializing in blood disorders and anemia.", "location": "Room 116", "availability": "off-duty" },
  { "name": "Dr. Samuel Garcia", "course": "MBBS", "specialization": "Gastroenterology", "ratings": 4.2, "description": "Gastroenterologist focusing on digestive system disorders.", "location": "Room 117", "availability": "free" },
  { "name": "Dr. Chloe Allen", "course": "MD", "specialization": "Plastic Surgery", "ratings": 4.8, "description": "Plastic surgeon with expertise in reconstructive and aesthetic procedures.", "location": "Room 118", "availability": "busy" },
  { "name": "Dr. Benjamin King", "course": "MBBS", "specialization": "Neurosurgery", "ratings": 4.7, "description": "Neurosurgeon specializing in spinal surgeries and brain disorders.", "location": "Room 119", "availability": "off-duty" },
  { "name": "Dr. Mia Scott", "course": "MD", "specialization": "Internal Medicine", "ratings": 4.3, "description": "Experienced internist specializing in adult medicine.", "location": "Room 120", "availability": "free" },
  { "name": "Dr. Lucas Wright", "course": "DNB", "specialization": "Cardiology", "ratings": 4.5, "description": "Cardiologist specializing in heart disease prevention and treatment.", "location": "Room 121", "availability": "busy" },
  { "name": "Dr. Zoe Harris", "course": "MBBS", "specialization": "Rheumatology", "ratings": 4.6, "description": "Treating autoimmune diseases and rheumatic disorders.", "location": "Room 122", "availability": "off-duty" },
  { "name": "Dr. Ethan Young", "course": "MD", "specialization": "Infectious Diseases", "ratings": 4.4, "description": "Infectious disease specialist focused on preventing and treating infections.", "location": "Room 123", "availability": "free" },
  { "name": "Dr. Lily King", "course": "MBBS", "specialization": "Obstetrics", "ratings": 4.9, "description": "Obstetrician specializing in maternal care and childbirth.", "location": "Room 124", "availability": "busy" },
  { "name": "Dr. Alexander Hill", "course": "MD", "specialization": "Emergency Medicine", "ratings": 4.3, "description": "Experienced in emergency care and trauma management.", "location": "Room 125", "availability": "off-duty" },
  { "name": "Dr. Ruby Adams", "course": "MBBS", "specialization": "Geriatrics", "ratings": 4.6, "description": "Geriatric specialist with focus on aging-related diseases.", "location": "Room 126", "availability": "free" },
  { "name": "Dr. Joseph Carter", "course": "MBBS", "specialization": "Chiropractic", "ratings": 4.5, "description": "Chiropractor specializing in spinal health and pain management.", "location": "Room 127", "availability": "busy" },
  { "name": "Dr. Charlotte Mitchell", "course": "MD", "specialization": "Vascular Surgery", "ratings": 4.7, "description": "Surgeon specializing in blood vessel and circulatory system disorders.", "location": "Room 128", "availability": "off-duty" },
  { "name": "Dr. Matthew Baker", "course": "MBBS", "specialization": "Pediatrics", "ratings": 4.6, "description": "Pediatrician providing health care for children of all ages.", "location": "Room 129", "availability": "free" },
  { "name": "Dr. Hannah Wilson", "course": "DGO", "specialization": "Gynecology", "ratings": 4.4, "description": "Gynecologist focused on women's reproductive health.", "location": "Room 130", "availability": "busy" },
  { "name": "Dr. Daniel Moore", "course": "MD", "specialization": "Cardiology", "ratings": 4.8, "description": "Cardiologist treating a wide range of heart conditions.", "location": "Room 131", "availability": "off-duty" }
];


const query = 'INSERT INTO doctor (name, course, specialization, ratings, description,location,availability) VALUES ?';

const values = doctor.map(doc => [doc.name, doc.course, doc.specialization, doc.ratings, doc.description,doc.location,doc.availability]);

connection.query(query, [values], (err, result) => {
  if (err) {
    console.error('Error inserting data:', err);
    return;
  }
  console.log(`Inserted ${result.affectedRows} rows`);
  connection.end();
});
