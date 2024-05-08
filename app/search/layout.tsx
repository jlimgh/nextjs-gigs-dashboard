import SideNav from '@/app/ui/search/sidenav';

interface SidebarProps {
  children: React.ReactNode;
  params: { countyId: string,  regionId: string}
}
 
export default function Layout({ children, params }: SidebarProps) {
  const countyId = params.countyId;
  const regionId = params.regionId;

  console.log('countyId: ', countyId);
  console.log('regionId: ', regionId);
  console.log('params:', params);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}