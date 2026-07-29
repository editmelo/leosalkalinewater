import { DELIVERY_SCHEDULE } from "@/lib/order/delivery-schedule";

// The four weekly delivery routes, shown on the store page so customers can see which
// day their neighborhood gets water before they even order.
export function DeliverySchedule({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <div className="text-center">
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
            Delivery Days 💧
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-navy sm:text-3xl">Know when your water arrives</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-brand-text/70">
            We run Indianapolis on a set weekly route. Find your ZIP below — that&apos;s your delivery day.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {DELIVERY_SCHEDULE.map((d) => (
            <div
              key={d.day}
              className="rounded-xl border border-black/10 bg-white p-4"
              style={{ borderLeft: `5px solid ${d.accent}` }}
            >
              <div className="flex items-baseline gap-2">
                <span aria-hidden>{d.emoji}</span>
                <span className="font-[family-name:var(--font-heading)] text-lg font-extrabold text-brand-navy">
                  {d.day}
                </span>
                <span className="text-sm font-semibold text-brand-text/60">· {d.region}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {d.zips.map((z) => (
                  <span key={z} className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs text-brand-text/80">
                    {z}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-text/50">
          Don&apos;t see your ZIP? You may still be in range — add your order and we&apos;ll confirm your delivery day.
        </p>
      </div>
    </section>
  );
}
