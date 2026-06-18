"use client";

import { CSSProperties, FormEvent, useState } from "react";

import { Building2, CalendarDays, Clock3, Gift, MapPin } from "lucide-react";

const roleOptions = ["Родитель", "Будущий студент"] as const;
const budgetOptions = [
  "До $2 000",
  "$2 000 – $5 000",
  "$5 000 – $10 000",
  "$10 000+",
  "Пока не знаем",
] as const;

type Role = (typeof roleOptions)[number];
type YearlyBudget = (typeof budgetOptions)[number];

type ApplicationForm = {
  role: Role | "";
  fullName: string;
  phone: string;
  specialty: string;
  yearlyBudget: YearlyBudget | "";
};

const initialFormState: ApplicationForm = {
  role: roleOptions[0],
  fullName: "",
  phone: "",
  specialty: "",
  yearlyBudget: "",
};

export const logoMaskStyle: CSSProperties = {
  WebkitMaskImage: "url(/lg.png)",
  WebkitMaskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskImage: "url(/lg.png)",
  maskPosition: "center",
  maskRepeat: "no-repeat",
  maskSize: "contain",
};

export default function Home() {
  const [form, setForm] = useState<ApplicationForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const updateField = <K extends keyof ApplicationForm>(
    field: K,
    value: ApplicationForm[K],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setForm(initialFormState);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eeeeee] text-[#111827]">
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center">
        <section className="w-full rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,24,39,0.08)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="space-y-3">
            <div className="flex justify-center pb-4">
              <div
                aria-label="Unicorum"
                role="img"
                className="aspect-[2447/541] w-full max-w-[220px] bg-[#49B1F8]"
                style={logoMaskStyle}
              />
            </div>

            <div className="space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#49B1F8] px-3 py-1.5 text-[13px] font-semibold text-white">
                  <CalendarDays className="size-4" />
                  24 июня · Алматы
                </div>

                <h1 className="max-w-2xl text-[24px] font-semibold leading-tight text-[#111827] sm:text-[28px]">
                  Семинар с официальными представителями{" "}
                  <span className="text-[#49B1F8]">
                    Istanbul Medipol University
                  </span>
                </h1>

                <p className="max-w-2xl text-[14px] leading-relaxed text-[#6B7280] sm:text-base">
                  Узнайте всё о поступлении, специальностях и стоимости
                  обучения, а также задайте свои вопросы представителям
                  университета лично.
                </p>
              </div>

              <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#49B1F8]/10 text-[#49B1F8]">
                    <Clock3 className="size-4" />
                  </div>

                  <div>
                    <p className="text-[12px] text-[#9CA3AF]">Время</p>
                    <p className="text-[14px] font-semibold text-[#111827]">
                      17:30
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#49B1F8]/10 text-[#49B1F8]">
                    <Building2 className="size-4" />
                  </div>

                  <div>
                    <p className="text-[12px] text-[#9CA3AF]">Место</p>
                    <p className="text-[14px] font-semibold text-[#111827]">
                      Kazakhstan Hotel
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#49B1F8]/10 text-[#49B1F8]">
                    <MapPin className="size-4" />
                  </div>

                  <div>
                    <p className="text-[12px] text-[#9CA3AF]">Зал</p>
                    <p className="text-[14px] font-semibold text-[#111827]">
                      Elegant Conference Hall
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex max-w-2xl items-start gap-3 rounded-xl border border-[#49B1F8]/40 bg-[#49B1F8]/10 px-4 py-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#49B1F8] text-white">
                  <Gift className="size-4" />
                </div>

                <div>
                  <p className="text-[14px] font-semibold text-[#268FD6] sm:text-base">
                    Специальное предложение для участников
                  </p>

                  <p className="mt-0.5 text-[13px] leading-relaxed text-[#4B5563] sm:text-[14px]">
                    Получите специальную скидку на обучение и подарки от
                    университета.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {status === "success" ? (
            <div className="mt-8 flex min-h-[420px] items-center justify-center">
              <div className="success-card w-full max-w-md rounded-[28px] bg-[#F8FCFF] px-8 py-10 text-center shadow-[0_20px_50px_rgba(73,177,248,0.14)]">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_18px_40px_rgba(73,177,248,0.16)]">
                  <svg
                    viewBox="0 0 80 80"
                    className="h-20 w-20"
                    aria-hidden="true"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      className="success-ring fill-none stroke-[#49B1F8]"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26 41.5 35.5 51 55 31.5"
                      className="success-check fill-none stroke-[#49B1F8]"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="mt-6 text-[24px] font-semibold text-[#111827]">
                  Заявка отправлена
                </h2>
                <p className="mt-3 text-[15px] leading-6 text-[#6B7280]">
                  Спасибо! Мы скоро свяжемся с вами и подберем лучший вариант.
                </p>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-[#111827]">
                  Кто вы?
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((roleOption) => (
                    <label
                      key={roleOption}
                      className="group relative block cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={roleOption}
                        checked={form.role === roleOption}
                        onChange={(event) =>
                          updateField("role", event.target.value as Role)
                        }
                        required
                        className="peer sr-only"
                      />
                      <span className="flex rounded-2xl border border-[#D7DDE5] bg-white px-5 py-4 text-left text-[14px] font-medium text-[#111827] transition-all duration-200 hover:border-[#B6DFFF] hover:bg-[#FAFCFF] peer-checked:border-[#B6DFFF] peer-checked:bg-[#EEF8FF] peer-checked:text-[#49B1F8] peer-focus-visible:ring-2 peer-focus-visible:ring-[#49B1F8] peer-focus-visible:ring-offset-2">
                        {roleOption}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#111827]">ФИО</span>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  required
                  placeholder="Имя Фамилия"
                  value={form.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-[#D7DDE5] bg-[#FCFCFD] px-4 text-base text-[#111827] shadow-[0_10px_30px_rgba(17,24,39,0.04)] outline-none transition focus:border-[#49B1F8] focus:bg-white focus:ring-4 focus:ring-[#49B1F8]/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#111827]">
                  Номер телефона
                </span>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 777 777 77 77"
                  required
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="h-14 w-full rounded-2xl border border-[#D7DDE5] bg-[#FCFCFD] px-4 text-base text-[#111827] shadow-[0_10px_30px_rgba(17,24,39,0.04)] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#49B1F8] focus:bg-white focus:ring-4 focus:ring-[#49B1F8]/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#111827]">
                  Специальность
                </span>
                <input
                  type="text"
                  name="specialty"
                  placeholder="Медицина, IT, бизнес..."
                  required
                  value={form.specialty}
                  onChange={(event) =>
                    updateField("specialty", event.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-[#D7DDE5] bg-[#FCFCFD] px-4 text-base text-[#111827] shadow-[0_10px_30px_rgba(17,24,39,0.04)] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#49B1F8] focus:bg-white focus:ring-4 focus:ring-[#49B1F8]/20"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-[#111827]">
                  Годовой бюджет
                </span>
                <select
                  name="yearlyBudget"
                  required
                  value={form.yearlyBudget}
                  onChange={(event) =>
                    updateField(
                      "yearlyBudget",
                      event.target.value as YearlyBudget | "",
                    )
                  }
                  className="h-14 w-full appearance-none rounded-2xl border border-[#D7DDE5] bg-[#FCFCFD] px-4 text-base text-[#111827] shadow-[0_10px_30px_rgba(17,24,39,0.04)] outline-none transition focus:border-[#49B1F8] focus:bg-white focus:ring-4 focus:ring-[#49B1F8]/20"
                >
                  <option value="" disabled>
                    Выберите бюджет
                  </option>
                  {budgetOptions.map((budgetOption) => (
                    <option key={budgetOption} value={budgetOption}>
                      {budgetOption}
                    </option>
                  ))}
                </select>
              </label>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-14 w-full items-center justify-center rounded-2xl border border-[#79C6FA] bg-[#49B1F8] px-5 text-base font-semibold text-white shadow-[0_22px_50px_rgba(73,177,248,0.42)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#49B1F8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                </button>

                {status === "error" ? (
                  <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                    Не удалось отправить заявку. Попробуйте ещё раз.
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
