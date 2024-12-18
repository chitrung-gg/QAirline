import { Card, CardBody } from "@nextui-org/react";

  
interface PolicySectionProps {
    title: string;
    content: string;
}

interface PolicyData {
    title: string;
    treeContent: {
        sections: {
            title: string;
            content: string;
            subsections: {
                title: string;
                content: string;
            }[];
        }[];
    };
}

const PolicySection = ({ title, content }: PolicySectionProps) => (
    <div className="space-y-2">
        <h2 className="font-semibold">{title}</h2>
        <p>{content}</p>
    </div>
);

export default function Policy({ policyData }: { policyData: PolicyData }) {
    interface Section {
        title: string;
        content: string;
        subsections?: Subsection[];
    }

    interface Subsection {
        title: string;
        content: string;
    }

    const renderSections = (sections: Section[]) => {
        return sections.map((section, index) => (
          <div key={index} className="space-y-2">
            <PolicySection title={section.title} content={section.content} />
            {section.subsections && section.subsections.length > 0 && (
              <div className="pl-6 space-y-2">
                {section.subsections.map((subsection, subIndex) => (
                  <PolicySection key={subIndex} title={subsection.title} content={subsection.content}/>
                ))}
              </div>
            )}
          </div>
        ));
      };

    return (
        <div className="bg-sky-image bg-cover bg-center bg-fixed">
            <div className="inset-0 overflow-y-auto">
                <div className="min-h-screen flex flex-col items-center mobile:px-4 tablet:px-6 px-8 py-12">
                    <h1 className="text-2xl font-semibold text-center mb-12 text-white
                    desktop:text-3xl pt-12">
                        {policyData.title}
                    </h1>
                    <Card className="w-full max-w-5xl bg-white/70 backdrop-blur-sm rounded-lg">
                        <CardBody className="p-8">
                            <div className="space-y-6 mobile:text-sm tablet:text-sm text-base">
                                <p>
                                    QAirline luôn mong muốn được đồng hành cùng Quý khách trong những chuyến bay và cam kết áp dụng mọi biện pháp
                                    để bảo vệ khách hàng trong suốt hành trình bay cùng QAirline.
                                </p>

                                {renderSections(policyData.treeContent.sections)}

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}