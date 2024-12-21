import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
    return (
        <div className="max-w-6xl mx-auto pb-12
        mobile:px-2
        tablet:px-4
        mini-laptop:px-8
        laptop:px-8">
            <Accordion variant='splitted'>
                {faqs.map((faq, index) => (
                    <AccordionItem key={index}
                        aria-label={faq.question}
                        indicator={({ isOpen }) =>
                            (isOpen ? <FaMinus className='text-blue-normal' /> : <FaPlus className='text-blue-normal' />)}
                        title={<div>
                            <p className="text-lg mobile:text-base tablet:text-base font-medium text-blue-normal">{faq.question}</p>
                        </div>}>
                        <div>
                            <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQSection;