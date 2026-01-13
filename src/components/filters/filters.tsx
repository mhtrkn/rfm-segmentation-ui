import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ActivityIcon, CalendarDaysIcon, TurkishLiraIcon } from "lucide-react";

interface FiltersValue {
  recency: [number, number];
  frequency: [number, number];
  monetary: [number, number];
}

interface FiltersProps {
  value: FiltersValue;
  onChange: (value: FiltersValue) => void;
}

export function Filters({ value, onChange }: FiltersProps) {
  function updateRange(
    key: keyof FiltersValue,
    newValue: [number, number]
  ) {
    onChange({
      ...value,
      [key]: newValue,
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10 my-8">
      <Card className="py-4">
        <CardHeader className="px-4">
          <CardTitle>Recency (Gün)
          </CardTitle>
          <CardDescription className="relative flex items-center justify-between p-0">
            Son {value.recency[1] - value.recency[0]} gün içinde işlem yapanlar
            <CalendarDaysIcon className="absolute right-0 -top-6 opacity-20 pointer-events-none" width={32} height={32} />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <FilterSlider
            min={0}
            max={365}
            value={value.recency}
            onChange={(v) => updateRange("recency", v)}
          />
        </CardContent>
        <CardFooter className="px-4">
          {value?.recency[0]} - {value?.recency[1]}
        </CardFooter>
      </Card>

      <Card className="py-4">
        <CardHeader className="px-4">
          <CardTitle>Frequency (İşlem Sıklığı)</CardTitle>
          <CardDescription className="relative flex items-center justify-between p-0">
            {value.frequency[1] - value.frequency[0]} adet işlem
            <ActivityIcon className="absolute right-0 -top-6 opacity-20 pointer-events-none" width={32} height={32} />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <FilterSlider
            min={0}
            max={100}
            value={value.frequency}
            onChange={(v) => updateRange("frequency", v)}
          />
        </CardContent>
        <CardFooter className="px-4">
          {value?.frequency[0]} - {value?.frequency[1]}
        </CardFooter>
      </Card>


      <Card className="py-4">
        <CardHeader className="px-4">
          <CardTitle>Monetary (Harcama Tutarı)</CardTitle>
          <CardDescription className="relative flex items-center justify-between p-0">
            {value.monetary[1] - value.monetary[0]}₺ e kadar yapılan harcamalar
            <TurkishLiraIcon className="absolute right-0 -top-6 opacity-20 pointer-events-none" width={32} height={32} />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <FilterSlider
            min={0}
            max={10000}
            value={value.monetary}
            onChange={(v) => updateRange("monetary", v)}
          />
        </CardContent>
        <CardFooter className="px-4">
          {value?.monetary[0]} - {value?.monetary[1]}
        </CardFooter>
      </Card>

    </div>
  );
}

interface FilterSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

function FilterSlider({
  min,
  max,
  value,
  onChange,
}: FilterSliderProps) {
  return (
    <Slider
      min={min}
      max={max}
      step={1}
      value={value}
      onValueChange={(v) => onChange([v[0], v[1]])}
    />
  );
}
