import type { Metadata } from "next";
import { logoMaskStyle } from "../page";

type PrintableFieldProps = {
  label: string;
  heightClassName?: string;
};

const fieldBoxClassName =
  "mt-2 rounded-[10px] border border-[#CBD5E1] bg-white";

function PrintableField({
  label,
  heightClassName = "h-14",
}: PrintableFieldProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-[15px] font-medium leading-6 text-[#0F172A]">
        {label}
      </h2>
      <div className={`${fieldBoxClassName} ${heightClassName}`} />
    </section>
  );
}

export const metadata: Metadata = {
  title: "Заявка на консультацию",
  description: "Печатная форма заявки на консультацию",
};

export default function ConsultationFormPage() {
  return (
    <main className="min-h-screen bg-[#E2E8F0]/50 px-4 py-8 text-[#0F172A] print:bg-white print:p-0">
      <section className="print-sheet mx-auto w-full max-w-[794px] bg-white px-8 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:min-h-[1123px] sm:px-12 sm:py-10 print:min-h-0 print:max-w-none print:px-[18mm] print:py-[16mm] print:shadow-none">
        <div className="flex justify-start">
          <div
            aria-label="Unicorum"
            role="img"
            className="aspect-[2447/541] w-full max-w-[220px] bg-[#49B1F8]"
            style={logoMaskStyle}
          />
        </div>

        <header className="mt-10">
          <h1 className="text-[30px] font-semibold tracking-[-0.03em] text-[#0F172A]">
            Заявка на консультацию
          </h1>
          <div className="mt-5 h-px bg-[#CBD5E1]" />
        </header>

        <section className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-[#0F172A]">
          <div className="inline-flex items-center gap-3">
            <span className="h-[18px] w-[18px] rounded-[4px] border border-[#94A3B8]" />
            <span>Родитель</span>
          </div>
          <div className="inline-flex items-center gap-3">
            <span className="h-[18px] w-[18px] rounded-[4px] border border-[#94A3B8]" />
            <span>Будущий студент</span>
          </div>
        </section>

        <div className="mt-10 space-y-8">
          <section className="space-y-4">
            <h2 className="text-[15px] font-medium leading-6 text-[#0F172A]">
              1. ФИО
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-[14px] leading-6 text-[#334155]">Имя</h3>
                <div className={`${fieldBoxClassName} h-14`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-[14px] leading-6 text-[#334155]">
                  Фамилия
                </h3>
                <div className={`${fieldBoxClassName} h-14`} />
              </div>
            </div>
          </section>

          <PrintableField label="2. Номер телефона" />

          <PrintableField label="3. Специальность" />

          <PrintableField label="4. Какую специальность рассматриваете?" />

          <PrintableField
            label="5. В пределах какой суммы рассчитываете годовое обучение?"
            heightClassName="h-16"
          />

          <PrintableField
            label="6. Комментарий / дополнительные вопросы"
            heightClassName="h-36"
          />
        </div>
      </section>
    </main>
  );
}
