"use client";

import { useState, useMemo } from "react";
import data from "@/data/data.json";
import { Filters } from "@/components/filters/filters";
import { Grid } from "@/components/grid/grid";
import { scoreRFMRecords } from "@/utils/rfm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
export default function HomePage() {
  const [filters, setFilters] = useState({
    recency: [1, 365] as [number, number],
    frequency: [1, 50] as [number, number],
    monetary: [100, 50000] as [number, number],
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.recency >= filters.recency[0] &&
      item.recency <= filters.recency[1] &&
      item.frequency >= filters.frequency[0] &&
      item.frequency <= filters.frequency[1] &&
      item.monetary >= filters.monetary[0] &&
      item.monetary <= filters.monetary[1]
    );
  }, [filters]);

  const scoredData = useMemo(
    () => scoreRFMRecords(filteredData),
    [filteredData]
  );

  function handleCellSelect(cellIds: number[]) {
    setSelectedIds(prev => {
      const allSelected = cellIds.every(id =>
        prev.includes(id)
      );

      if (allSelected) {
        return prev.filter(id => !cellIds.includes(id));
      }

      return Array.from(new Set([...prev, ...cellIds]));
    });
  }

  async function submitSelection() {
    await fetch("/api/selected-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });

    toast.success(`Gönderilen ID sayısı: ${selectedIds.length}`, {
      description: "ID'lerin detaylarına network/payload kısmından ulaşabilirsiniz."
    });
  }

  return (
    <main className="flex flex-col h-screen w-full p-8">
      <h1 className="text-2xl w-full text-center self-center font-semibold uppercase">
        RFM Segmentasyon Grid
      </h1>

      <div className="flex flex-col gap-5 grow">
        <Filters value={filters} onChange={setFilters} />
        <blockquote className="mb-6 border-l-2 pl-6 italic">
          Bu grid, müşterileri işlem sıklığı (Frequency) ve harcama tutarı (Monetary) metriklerine göre 1–5 aralığında skorlayarak segmentlere ayırır;
          her hücre, belirli bir davranış profilini temsil eder (örneğin F1–M5, az sıklıkla ancak yüksek tutarda harcama yapan müşterileri,
          F5–M1 ise sık alışveriş yapan fakat düşük sepet tutarına sahip müşterileri ifade eder).
        </blockquote>
        <div className="flex grow justify-between gap-20">
          <Grid
            data={scoredData}
            selectedIds={selectedIds}
            onCellSelect={handleCellSelect}
            className="flex-1"
          />
        </div>

      </div>

      <Button
        onClick={submitSelection}
        className="mt-8 px-4 py-2 bg-blue-600 text-white text-base rounded w-fit self-end cursor-pointer hover:scale-105"
        disabled={selectedIds.length === 0}
      >
        Gönder
      </Button>
    </main>
  );
}
