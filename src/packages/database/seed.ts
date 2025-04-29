import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.specialty.deleteMany();
  await prisma.appointmentType.deleteMany();
  await prisma.specialty.createMany({
    data: specialties,
  });

  await prisma.appointmentType.createMany({
    data: appointmentTypes,
  });

  await prisma.symptom.createMany({
    data: symptoms,
  });
  await prisma.pathology.createMany({
    data: pathologies,
  });

  await prisma.test.createMany({
    data: test,
  });
}

const specialties = [
  { name: 'General Medicine' },
  { name: 'Dermatology' },
  { name: 'Cardiology' },
  { name: 'Endocrinology' },
  { name: 'Gastroenterology' },
  { name: 'Geriatrics' },
  { name: 'Gynecology' },
  { name: 'Hematology' },
  { name: 'Infectious Disease' },
  { name: 'Internal Medicine' },
  { name: 'Nephrology' },
  { name: 'Neurology' },
  { name: 'Oncology' },
  { name: 'Ophthalmology' },
  { name: 'Orthopedics' },
  { name: 'Pediatrics' },
  { name: 'Psychiatry' },
  { name: 'Pulmonology' },
  { name: 'Rheumatology' },
  { name: 'Urology' },
  { name: 'Family Medicine' },
  { name: 'Emergency Medicine' },
  { name: 'Physical Medicine and Rehabilitation' },
  { name: 'Anesthesiology' },
  { name: 'Plastic Surgery' },
  { name: 'Allergy and Immunology' }
];

const symptoms = [
  { name: 'Wheezing' },
  { name: 'Chest/neck pain' },
  { name: 'Groaning' },
  { name: 'Chills and/or sweating' },
  { name: 'Headache' },
  { name: 'Muscle or body pain' },
  { name: 'Swallowing discomfort or lack of appetite' },
  { name: 'Nasal mucus' },
  { name: 'Nasal congestion' },
  { name: 'Irritability' },
  { name: 'Voice alteration' },
  { name: 'Breathing difficulty' },
  { name: 'Ear pain' },
  { name: 'Conjunctivitis' },
  { name: 'Diarrhea' },
  { name: 'Vomiting' },
  { name: 'Fatigue' },
  { name: 'Altered consciousness' },
  { name: 'Rapid breathing' },
  { name: 'Lack of oxygen or cyanosis' },
  { name: 'Slow or absent breathing' },
  { name: 'Cough' },
  { name: 'Fever' },
];

const pathologies = [
  { name: 'Asthma' },
  { name: 'Bronchopneumonia' },
  { name: 'Acute Bronchiolitis' },
  { name: 'Bronchitis/Acute/Chronic Obstructive' },
  { name: 'Influenza' },
  { name: 'Viral Pneumonia' },
  { name: 'Obstructive Bronchial Syndrome' },
  { name: 'Common cold' },
  { name: 'Epiglottitis' },
  { name: 'Whooping cough' },
  { name: 'Acute Laryngitis' },
  { name: 'Obstructive Acute Laryngitis' },
  { name: 'Laryngotracheitis' },
  { name: 'Bacterial Pneumonia' },
  { name: 'Whooping Cough-like Syndrome' },
  { name: 'Tracheitis' },
  { name: 'Pharyngotonsillitis' },
  { name: 'Acute Adenoiditis' },
  { name: 'Sinusitis' },
  { name: 'Covid 19' },
  { name: 'Atopic Pneumonia' },
];

const appointmentTypes = [
  { name: 'Consultation', color: '#FF0000' },
  { name: 'Study', color: '#00FF00' },
  { name: 'Procedure', color: '#0000FF' },
];

const test = [
  { name: 'Blood test' },
  { name: 'Urine test' },
  { name: 'X-ray' },
  { name: 'MRI' },
  { name: 'CT Scan' },
  { name: 'Ultrasound' },
  { name: 'Biopsy' },
  { name: 'Endoscopy' },
  { name: 'Colonoscopy' },
  { name: 'Laparoscopy' },
  { name: 'Angiography' },
  { name: 'Echocardiography' },
  { name: 'Electrocardiogram' },
  { name: 'Electroencephalogram' },
  { name: 'Electromyography' },
  { name: 'Pulmonary function test' },
  { name: 'Bone marrow test' },
  { name: 'Skin test' },
  { name: 'Sweat test' },
  { name: 'Tilt table test' },
  { name: 'Treadmill test' },
  { name: 'Ultraviolet light test' },
  { name: 'Vascular test' },
  { name: 'Vestibular test' },
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
