import ApexCharts from 'apexcharts';
import { AxiosResponse } from 'axios';
import {
  createEffect,
  createSignal,
  on,
  onMount,
  ParentProps,
  Resource,
} from 'solid-js';
import LatestExpense from './LatestExpense';

type Props = ParentProps<{
  budgets: Resource<
    AxiosResponse<
      {
        total_spend: number;
        total_item: number;
        id: number;
        name: string;
        amount: string;
        icon: string;
        createdBy: string;
      }[],
      any
    >
  >;
}>;

export default ({ budgets }: Props) => {
  const [chart, setChart] = createSignal<ApexCharts>();

  createEffect(
    on(budgets, async (input) => {
      if (input && budgets.state === 'ready') {
        await chart()?.updateOptions({
          xaxis: {
            categories: input.data.map((val) => val.icon),
          },
        });
        await chart()?.updateSeries([
          {
            name: 'Total spend',
            data: input.data.map((val) => val.total_spend),
          },
          {
            name: 'Amount',
            data: input.data.map((val) => Number(val.amount)),
          },
        ]);
      }
    }),
  );

  onMount(() => {
    const options = {
      chart: {
        type: 'bar',
        height: 300,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      series: [
        {
          name: 'Total spend',
          data: [],
        },
        {
          name: 'Amount',
          data: [],
        },
      ],
      colors: ['#28a745', '#90e5a3'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20px',
          borderRadius: 0,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Graphik, sans-serif',
            fontWeight: 400,
          },
          offsetX: -2,
        },
        min: 0,
      },
      yaxis: {
        labels: {
          align: 'left',
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Graphik, sans-serif',
            fontWeight: 400,
          },
          formatter: (value: number) =>
            value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      grid: {
        borderColor: '#e5e7eb',
      },
      states: {
        hover: {
          filter: {
            type: 'darken',
            value: 0.9,
          },
        },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: {
              height: 300,
            },
            plotOptions: {
              bar: {
                columnWidth: '14px',
              },
            },
            stroke: {
              width: 8,
            },
            labels: {
              style: {
                colors: '#9ca3af',
                fontSize: '11px',
                fontFamily: 'Graphik, sans-serif',
                fontWeight: 400,
              },
              offsetX: -2,
              formatter: (title: string) => title.slice(0, 3),
            },
            yaxis: {
              labels: {
                align: 'left',
                minWidth: 0,
                maxWidth: 140,
                style: {
                  colors: '#9ca3af',
                  fontSize: '11px',
                  fontFamily: 'Graphik, sans-serif',
                  fontWeight: 400,
                },
                formatter: (value: number) =>
                  value >= 1000 ? `${value / 1000}k` : value,
              },
            },
          },
        },
      ],
    };

    const apexChart = new ApexCharts(
      document.querySelector('#activity-bar-charts'),
      options,
    );

    setChart(apexChart);

    chart()!.render();
  });

  return (
    <div class="md:col-span-2">
      <div class="rounded-xl mb-4 sm:mb-6 p-4 md:p-5 border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div class="flex justify-between items-center gap-4 mb-3 sm:mb-6">
          <h3 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
            Activity
          </h3>

          <div class="flex gap-x-4">
            <div class="inline-flex items-center">
              <span class="size-2.5 inline-block bg-primary-600 rounded-sm me-2"></span>
              <span class="text-[13px] text-gray-600 dark:text-neutral-400">
                Total spend
              </span>
            </div>
            <div class="inline-flex items-center">
              <span class="size-2.5 inline-block bg-primary-300 rounded-sm me-2 dark:bg-neutral-700"></span>
              <span class="text-[13px] text-gray-600 dark:text-neutral-400">
                Amount
              </span>
            </div>
          </div>
        </div>

        <div id="activity-bar-charts"></div>
      </div>

      <LatestExpense />
    </div>
  );
};
