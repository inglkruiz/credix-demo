// import styles from './index.module.css';
import { GetFormDefinitionResponse } from '@credix/api/types';
import { DatePicker } from '@credix/app/components';
import { getFormDefinition } from '@credix/app/utils';
import { Form, Input, InputNumber, Switch, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Component shortcuts
const FormItem = Form.Item;
const TypographyTitle = Typography.Title;

export const FormEntry: React.FC = () => {
  const { query } = useRouter();
  const [formData, setForData] = useState<GetFormDefinitionResponse>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (query.formId) {
      const fetchForm = async () => {
        setFormLoading(true);
        const response = await getFormDefinition(query.formId as string);
        if (response.status === 200) {
          setForData(response.data);
        }
        setFormLoading(false);
      };

      fetchForm();
    }
  }, [query.formId]);

  if (!formData) return null;
  if (formLoading) return <p>Loading...</p>;

  return (
    <Form name="formEntry" autoComplete="off" layout="vertical">
      {formData.questions.map((question, index) => {
        return (
          <React.Fragment key={question.id}>
            <TypographyTitle level={5} className="tw-mt-4">
              Question #{index + 1}
            </TypographyTitle>
            <FormItem label={question.question} name={`question${index}`}>
              {question.answerType === 'string' ? (
                <Input maxLength={250} showCount />
              ) : question.answerType === 'location' ? (
                <Input.Group compact>
                  <InputNumber
                    controls={false}
                    id={`formEntry_question${index}`}
                    stringMode={true}
                    name={`formEntry_question${index}_lat`}
                    placeholder="Latitude"
                    precision={7}
                    decimalSeparator="."
                  />
                  <InputNumber
                    controls={false}
                    stringMode={true}
                    name={`formEntry_question${index}_lon`}
                    placeholder="Longitude"
                    precision={7}
                    decimalSeparator="."
                  />
                </Input.Group>
              ) : question.answerType === 'integer' ? (
                <InputNumber controls={false} precision={0} />
              ) : question.answerType === 'boolean' ? (
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              ) : question.answerType === 'date' ? (
                <DatePicker format={'DD/MM/YYYY'} />
              ) : null}
            </FormItem>
          </React.Fragment>
        );
      })}
    </Form>
  );
};

export default FormEntry;
