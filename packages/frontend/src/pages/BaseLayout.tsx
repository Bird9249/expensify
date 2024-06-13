import { RouteSectionProps } from '@solidjs/router';
import Header from '../components/layouts/Header';
import Sidebar from '../components/layouts/Sidebar';
import { BreadcrumbProvider } from '../contexts/BreadcrumbContext';
import { ConfirmProvider } from '../contexts/ConfirmContext';
import { ToastsProvider } from '../contexts/ToastsContext';

export default (props: RouteSectionProps) => {
  return (
    <div class="relative">
      <ConfirmProvider>
        <ToastsProvider>
          <Header />
          <BreadcrumbProvider>
            <Sidebar />
            <div class="w-full lg:ps-64">
              <div class="space-y-4 sm:space-y-6 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                {props.children}
              </div>
            </div>
          </BreadcrumbProvider>
        </ToastsProvider>
      </ConfirmProvider>
    </div>
  );
};
