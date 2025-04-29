'use client';
import { default as chatDark, default as chatLight } from '@/src/assets/images/call-chat.png';
import { default as callPlaceholderDark, default as callPlaceholderLight } from '@/src/assets/images/call-image.png';
import { default as feeLight } from '@/src/assets/images/fees.png';
import { default as breakdownDark, default as breakdownLight } from '@/src/assets/images/filters.png';
import { default as heroImageDark, default as heroImageLight } from '@/src/assets/images/hero.png';
import { default as timeFormatDark, default as timeFormatLight } from '@/src/assets/images/options.png';
import { default as timetrackerDark, default as timetrackerLight } from '@/src/assets/images/patients.png';
import { default as callControlDark, default as callControlLight } from '@/src/assets/images/toolbar.png';
import { motion } from 'framer-motion';
import { CtaLink } from './atoms/cta-link';
import { DynamicImage } from './atoms/dynamic-image';
export default function SectionOne() {
  return (
    <>
      <section className="mt-24 md:mt-[200px] mb-12">
        <h3 className="text-4xl md:text-8xl font-medium">Everything you need</h3>
        <p className="mt-4 md:mt-8 text-[#878787]">
          From automated receipt-to-transaction mapping to conversing with your financials and consolidating all your
          files
        </p>
      </section>
      <section className="border border-border container  lg:pb-0 overflow-hidden mb-12 group">
        <div className="flex flex-col lg:flex-row">
          <DynamicImage
            lightSrc={heroImageLight}
            darkSrc={heroImageDark}
            height={400}
            width={810}
            className="mb-6 mt-6 object-contain lg:w-1/2 border border-border"
            alt="Overview"
          />

          <div className="xl:mt-6 lg:max-w-[40%] md:ml-8 md:mb-8 flex flex-col justify-center p-8 md:pl-0 relative">
            <h3 className="font-medium text-xl md:text-2xl mb-4">Financial overview</h3>

            <p className="text-[#878787] mb-8 lg:mb-4 text-sm">
              Bring your own bank. We connect to over 20 000+ banks in 33 countries across US, Canada, UK and Europe.
              Keep tabs on your expenses and income, and gain a clearer picture of your business`s financial track
              record and current situation.
            </p>

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Revenue</span>
              </div>

              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Profit & Loss</span>
              </div>

              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Burnrate</span>
              </div>

              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Expenses</span>
              </div>

              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Unified currency overview across all your accounts</span>
              </div>

              <div className="flex space-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary text-sm">Shareable reports</span>
              </div>
            </div>

            <div className="absolute bottom-0 right-0">
              <CtaLink text="Get on top of your finances" />
            </div>
          </div>
        </div>
      </section>
      <section className="relative mb-12 group">
        <div className="border border-border container  p-8 md:p-10 md:pb-0 overflow-hidden">
          <div className="flex flex-col md:space-x-12 md:flex-row">
            <div className="xl:mt-6 md:max-w-[40%] md:mr-8 md:mb-8">
              <h3 className="font-medium text-xl md:text-2xl mb-4">Time track your projects</h3>

              <p className="text-[#878787] md:mb-4 text-sm">
                Track your time, monitor project durations, set rates and create <br />
                invoices from your recorded hours.
              </p>

              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center mt-8 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                    <path
                      fill="currentColor"
                      d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                    />
                  </svg>
                  <span className="text-primary">Get a monthly overview of tracked hours</span>
                </div>
                <div className="flex space-x-2 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                    <path
                      fill="currentColor"
                      d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                    />
                  </svg>
                  <span className="text-primary">Set billable rate & time estimates</span>
                </div>

                <div className="flex space-x-2 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                    <path
                      fill="currentColor"
                      d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                    />
                  </svg>
                  <span className="text-primary">See billable amount & monthly breakdown</span>
                </div>

                <div className="flex space-x-2 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                    <path
                      fill="currentColor"
                      d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                    />
                  </svg>
                  <span className="text-primary">Create invoice based on recorded time</span>
                </div>

                <div className="flex space-x-2 items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                    <path
                      fill="currentColor"
                      d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                    />
                  </svg>
                  <span className="text-primary">Export as CSV</span>
                </div>
              </div>

              <div className="absolute bottom-6">
                <CtaLink text="Start tracking time now" />
              </div>
            </div>

            <div className="relative mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute -left-[80px] top-[200px]"
              >
                <DynamicImage
                  lightSrc={timeFormatLight}
                  darkSrc={timeFormatDark}
                  height={142}
                  width={135}
                  className="object-contain border border-border"
                  alt="Time format"
                />
              </motion.div>

              <div className="scale-75 md:scale-100">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="absolute -right-[65px] md:-right-[15px] md:-top-[20px]"
                >
                  <DynamicImage
                    lightSrc={breakdownLight}
                    darkSrc={breakdownDark}
                    height={124}
                    width={238}
                    className="object-contain border border-border"
                    alt="Breakdown"
                  />
                </motion.div>
              </div>
              <DynamicImage
                lightSrc={timetrackerLight}
                darkSrc={timetrackerDark}
                height={400}
                className="-mb-[32px] md:-mb-[1px] object-contain mt-8 md:mt-0 border border-border"
                alt="Tracker"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-between space-y-12 lg:space-y-0 lg:space-x-8 flex-col lg:flex-row overflow-hidden mb-12 relative">
        <div className="border border-border md:basis-2/3 p-10 flex justify-between md:space-x-8 md:flex-row flex-col group">
          <div className="flex flex-col md:basis-1/2">
            <h4 className="font-medium text-xl md:text-2xl mb-4">Citas online</h4>

            <p className="text-[#878787] md:mb-4 text-sm">
              Desde la comodidad del lugar que desees, puedes gestionar y agendar tus citas médicas. Con la opción de
              ser atendido por un médico en línea.
            </p>

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 items-center mt-8 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Agenda citas medicas</span>
              </div>
              <div className="flex space-x-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Ten acceso a profesionales al instante</span>
              </div>

              <div className="flex space-x-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Chatea con tus Patients</span>
              </div>

              <div className="flex space-x-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Gestiona toda la información de la cita desde un solo lugar</span>
              </div>

              <div className="flex space-x-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Revisa los Test y valores vitales de tus Patients</span>
              </div>

              <div className="flex space-x-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                  <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
                </svg>
                <span className="text-primary">Exporta como PDF las recetas e Indications</span>
              </div>

              <div className="absolute bottom-6">
                <CtaLink text="Agenda tu primera cita" />
              </div>
            </div>
          </div>

          <div className="md:basis-1/2 md:mt-8 -ml-[40px] md:-ml-0 -bottom-[8px] relative">
            <DynamicImage
              lightSrc={chatLight}
              darkSrc={chatDark}
              width={299}
              height={423}
              className="object-contain -bottom-[33px] relative ml-[10%] xl:ml-[20%] border border-border"
              alt="Invoicing"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute left-4 md:-left-[80px] bottom-[50px]"
            >
              <DynamicImage
                lightSrc={callPlaceholderLight}
                darkSrc={callPlaceholderDark}
                height={57}
                width={227}
                className="object-contain border border-border"
                alt="Invoice comments"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              viewport={{ once: true }}
              className="absolute -right-8 top-[250px]"
            >
              <DynamicImage
                lightSrc={callControlLight}
                darkSrc={callControlDark}
                height={34}
                width={136}
                className="object-contain"
                alt="Invoice toolbar"
              />
            </motion.div>
          </div>
        </div>

        <div className="border border-border basis-1/3 p-10 flex flex-col relative group">
          <h4 className="font-medium text-xl md:text-2xl mb-4">Inbox</h4>
          <ul className="list-decimal list-inside text-[#878787] text-sm space-y-2 leading-relaxed">
            <li>Use your personalized email address for your invoices and receipts.</li>
            <li>The invoice arrives in the inbox, Midday gives you a transaction suggestion to match it with.</li>
            <li>Your transaction now have the right basis/attachments for you to export.</li>
          </ul>

          <div className="flex flex-col space-y-2 mb-6">
            <div className="flex space-x-2 items-center mt-8 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
              </svg>
              <span className="text-primary">Personlized email</span>
            </div>
            <div className="flex space-x-2 items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
              </svg>
              <span className="text-primary">Smart search receipts and invoices content</span>
            </div>

            <div className="flex space-x-2 items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} fill="none">
                <path fill="currentColor" d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z" />
              </svg>
              <span className="text-primary">Automatically saves invoices and receipt in your vault</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.4 }}
            viewport={{ once: true }}
            className="xl:absolute bottom-[100px] w-[400px]"
          >
            <DynamicImage
              lightSrc={feeLight}
              darkSrc={feeLight}
              height={33}
              width={374}
              className="object-contain size-full  rotate-12 border-border border"
              alt="Inbox actions"
            />
          </motion.div>

          <div className="absolute bottom-6">
            <CtaLink text="Automate your reconciliation process" />
          </div>
        </div>
      </section>
    </>
  );
}
