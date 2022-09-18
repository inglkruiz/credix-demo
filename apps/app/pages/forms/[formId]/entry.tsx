// import styles from './index.module.css';
import {
  CreateFormEntryAnswer,
  GetFormDefinitionResponse,
} from '@credix/api/types';
import { DatePicker } from '@credix/app/components';
import {
  createFormDefinitionEntry,
  getFormDefinition,
} from '@credix/app/utils';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  PageHeader,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, {
  createRef,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';

// Component shortcuts
const FormItem = Form.Item;
const TypographyTitle = Typography.Title;

export const FormEntry: React.FC = () => {
  const { query, push, back } = useRouter();
  const [formData, setFormData] = useState<GetFormDefinitionResponse>(null);
  const [formLoading, setFormLoading] = useState(false);
  const formRef = createRef<FormInstance>();

  useEffect(() => {
    if (query.formId) {
      const fetchForm = async () => {
        setFormLoading(true);
        const response = await getFormDefinition(query.formId as string);
        if (response.status === 200) {
          setFormData(response.data);
        }
        setFormLoading(false);
      };

      fetchForm();
    }
  }, [query.formId]);

  if (!formData) return null;
  if (formLoading) return <p>Loading...</p>;

  const finish: FormProps['onFinish'] = async (values) => {
    console.log(values);
    const answers: CreateFormEntryAnswer[] = Object.values(values).map(
      (value, index) => {
        const question = formData.questions[index];
        let answer = '';
        switch (question.answerType) {
          case 'integer':
            answer = `${value}`;
            break;
          case 'boolean':
            answer = value ? 'True' : 'False';
            break;
          case 'location':
            // TODO:Validate, split values, trim, use isLatLong
            answer = value as string;
            break;
          case 'string':
            answer = value as string;
            break;
          case 'date':
            answer = `${dayjs(value as Date).unix()}`;
        }
        return {
          questionId: question.id,
          answer,
          answerType: question.answerType,
        };
      }
    );
    const createFormEntryResponse = await createFormDefinitionEntry(
      formData.id,
      {
        answers,
      }
    );
    if (createFormEntryResponse.status === 201) {
      push('/');
    }
  };

  const reset: MouseEventHandler<HTMLElement> = () => {
    formRef.current.resetFields();
  };

  return (
    <>
      <PageHeader onBack={back} title={formData.name} />
      <Form
        name="formEntry"
        autoComplete="off"
        layout="vertical"
        onFinish={finish}
        ref={formRef}
      >
        {formData.questions.map((question, index) => {
          return (
            <React.Fragment key={question.id}>
              <TypographyTitle level={5} className="tw-mt-4">
                Question #{index + 1}
              </TypographyTitle>
              <FormItem
                label={question.question}
                name={`answer${index}`}
                valuePropName={
                  question.answerType === 'boolean' ? 'checked' : 'value'
                }
                rules={[
                  ...(question.answerType !== 'boolean'
                    ? [
                        {
                          required: true,
                          message: 'Please input your answer!',
                        },
                      ]
                    : []),
                ]}
              >
                {question.answerType === 'string' ? (
                  <Input maxLength={250} showCount />
                ) : question.answerType === 'location' ? (
                  <Input maxLength={250} placeholder="Latitude,Longitude" />
                ) : question.answerType === 'integer' ? (
                  <InputNumber controls={false} precision={0} />
                ) : question.answerType === 'boolean' ? (
                  <Checkbox>Yes</Checkbox>
                ) : question.answerType === 'date' ? (
                  <DatePicker format={'DD/MM/YYYY'} />
                ) : null}
              </FormItem>
            </React.Fragment>
          );
        })}
        <Divider />
        <FormItem>
          <Button htmlType="button" onClick={reset} block>
            Reset
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default FormEntry;
