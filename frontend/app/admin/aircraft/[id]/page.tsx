import Breadcrumbs from "@/components/admin/breadcrumb";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    return (
      <main className='h-full w-full'>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Tàu bay', href: '/admin/aircraft' },
            {
                label: 'Chi tiết tàu bay',
                href: `/admin/aircraft/${id}`,
                active: true,
            },
            ]}
        />
        <div className="flex w-full items-center justify-between">
          <h1>hehe</h1>
        </div>
      </main>
    );
  }