"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { BookingType, BookingStep } from "@/types";
import StepIndicator from "./StepIndicator";
import CategoryStep from "./CategoryStep";
import DateTimeStep from "./DateTimeStep";
import ContactStep from "./ContactStep";

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<BookingStep>(1);
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Pre-select type from URL param (?tipo=vestido)
  useEffect(() => {
    const tipo = searchParams.get("tipo") as BookingType | null;
    if (tipo && ["vestido", "traje", "accesorios"].includes(tipo)) {
      setBookingType(tipo);
      setStep(tipo === "accesorios" ? 3 : 2);
    }
  }, [searchParams]);

  function handleCategorySelect(type: BookingType) {
    setBookingType(type);
    setStep(type === "accesorios" ? 3 : 2);
  }

  function handleDateTimeSelect(date: string, time: string) {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(3);
  }

  function handleBackFromDateTime() {
    setStep(1);
    setBookingType(null);
  }

  function handleBackFromContact() {
    if (bookingType === "accesorios") {
      setStep(1);
      setBookingType(null);
    } else {
      setStep(2);
    }
  }

  return (
    <div>
      <StepIndicator currentStep={step} type={bookingType ?? undefined} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryStep onSelect={handleCategorySelect} />
          </motion.div>
        )}

        {step === 2 && bookingType && bookingType !== "accesorios" && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DateTimeStep
              type={bookingType}
              onSelect={handleDateTimeSelect}
              onBack={handleBackFromDateTime}
            />
          </motion.div>
        )}

        {step === 3 && bookingType && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ContactStep
              booking={{
                type: bookingType,
                date: selectedDate,
                timeSlot: selectedTime,
              }}
              onBack={handleBackFromContact}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
