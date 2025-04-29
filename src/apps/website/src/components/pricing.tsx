'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { useState } from 'react';
import { PricingSection } from './pricing-section';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('patients');

  const pricingSections = [
    {
      id: 'patients',
      title: 'Patients',
      plans: [
        {
          name: 'Básico',
          price: 'Gratis',
          features: ['Acceso a perfil básico', 'Búsqueda de doctores', 'Citas en línea'],
        },
        {
          name: 'Premium',
          price: '$9.99/mes',
          features: ['Todo lo del plan Básico', 'Chat con doctores', 'Recordatorios de Medicines'],
        },
        {
          name: 'Familiar',
          price: '$19.99/mes',
          features: ['Todo lo del plan Premium', 'Hasta 5 perfiles familiares', 'Descuentos en Medicines'],
        },
      ],
      features: [
        { name: 'Acceso a perfil básico', includedIn: ['Básico', 'Premium', 'Familiar'] },
        { name: 'Búsqueda de doctores', includedIn: ['Básico', 'Premium', 'Familiar'] },
        { name: 'Citas en línea', includedIn: ['Básico', 'Premium', 'Familiar'] },
        { name: 'Chat con doctores', includedIn: ['Premium', 'Familiar'] },
        { name: 'Recordatorios de Medicines', includedIn: ['Premium', 'Familiar'] },
        { name: 'Perfiles familiares', includedIn: ['Familiar'] },
        { name: 'Descuentos en Medicines', includedIn: ['Familiar'] },
      ],
    },
    {
      id: 'doctors',
      title: 'Doctores',
      plans: [
        {
          name: 'Básico',
          price: '$29.99/mes',
          features: ['Perfil profesional', 'Gestión de citas', 'Hasta 50 Patients'],
        },
        {
          name: 'Profesional',
          price: '$59.99/mes',
          features: ['Todo lo del plan Básico', 'Chat con Patients', 'Hasta 200 Patients'],
        },
        {
          name: 'Experto',
          price: '$99.99/mes',
          features: ['Todo lo del plan Profesional', 'Patients ilimitados', 'Integración con EMR'],
        },
      ],
      features: [
        { name: 'Perfil profesional', includedIn: ['Básico', 'Profesional', 'Experto'] },
        { name: 'Gestión de citas', includedIn: ['Básico', 'Profesional', 'Experto'] },
        { name: 'Chat con Patients', includedIn: ['Profesional', 'Experto'] },
        { name: 'Hasta 50 Patients', includedIn: ['Básico'] },
        { name: 'Hasta 200 Patients', includedIn: ['Profesional'] },
        { name: 'Patients ilimitados', includedIn: ['Experto'] },
        { name: 'Integración con EMR', includedIn: ['Experto'] },
      ],
    },
    {
      id: 'hospitals',
      title: 'Hospitales',
      plans: [
        {
          name: 'Estándar',
          price: '$499/mes',
          features: ['Gestión de personal', 'Calendar de citas', 'Hasta 50 doctores'],
        },
        {
          name: 'Avanzado',
          price: '$999/mes',
          features: ['Todo lo del plan Estándar', 'Integración con laboratorio', 'Hasta 200 doctores'],
        },
        {
          name: 'Empresarial',
          price: 'Contactar',
          features: ['Todo lo del plan Avanzado', 'Personalización completa', 'Soporte 24/7'],
        },
      ],
      features: [
        { name: 'Gestión de personal', includedIn: ['Estándar', 'Avanzado', 'Empresarial'] },
        { name: 'Calendar de citas', includedIn: ['Estándar', 'Avanzado', 'Empresarial'] },
        { name: 'Hasta 50 doctores', includedIn: ['Estándar'] },
        { name: 'Hasta 200 doctores', includedIn: ['Avanzado'] },
        { name: 'Doctores ilimitados', includedIn: ['Empresarial'] },
        { name: 'Integración con laboratorio', includedIn: ['Avanzado', 'Empresarial'] },
        { name: 'Personalización completa', includedIn: ['Empresarial'] },
        { name: 'Soporte 24/7', includedIn: ['Empresarial'] },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">Nuestros Planes</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex justify-center items-center gap-3 bg-transparent">
          {pricingSections.map((section) => (
            <TabsTrigger
              className="data-[state=active]:border-b border-primary rounded-none"
              key={section.id}
              value={section.id}
            >
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {pricingSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <PricingSection title={section.title} plans={section.plans} features={section.features} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
