import Breadcrumbs from "@/components/admin/breadcrumb";

export default async function Page() {
    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
                { label: 'Tàu bay', href: '/admin/aircraft' },
                { label: 'Thêm tàu bay', href: `/admin/aircraft/create`, active: true},
            ]}
        />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl md:text-2xl text-blue-normal">
              Create
          </h1>
        </div>
      </main>
    );
  }