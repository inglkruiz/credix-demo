// import styles from './index.module.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type {
  CreateFormDefinition,
  ListFormDefinitionsResponse,
  ListFormDefinitionsResponseData,
} from '@credix/api/types';
import { createFormDefinition, getFormDefinitions } from '@credix/app/utils';
import {
  Button,
  Divider,
  Drawer,
  Form,
  FormInstance,
  FormProps,
  Input,
  PageHeader,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';
import React, { createRef, useEffect, useState } from 'react';

const columns: ColumnsType<ListFormDefinitionsResponseData> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '# Questions',
    dataIndex: 'numQuestions',
    key: 'numQuestions',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/forms/${record.id}/entry`}>
          <a>Add Entry</a>
        </Link>
        <Link href={`/forms/${record.id}/entries`}>
          <a>View Entries</a>
        </Link>
      </Space>
    ),
  },
];

// Component shortcuts
const FormItem = Form.Item;
const SelectOption = Select.Option;
const TypographyTitle = Typography.Title;
const InputTextArea = Input.TextArea;

export const Index: React.FC = () => {
  const [formListData, setFormListData] = useState<ListFormDefinitionsResponse>(
    [[], 0]
  );
  const [formListLoading, setFormListLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formRef = createRef<FormInstance>();

  useEffect(() => {
    const fetchFormList = async () => {
      setFormListLoading(true);
      const response = await getFormDefinitions();
      if (response.status === 200) {
        setFormListData(response.data);
      }
      setFormListLoading(false);
    };

    fetchFormList();
  }, []);

  if (formListLoading) return <p>Loading...</p>;

  const openNewForm = () => {
    setOpen(true);
  };

  const closeNewForm = () => {
    setOpen(false);
  };

  const finish: FormProps<CreateFormDefinition>['onFinish'] = async (
    values
  ) => {
    const createFormDefinitionResponse = await createFormDefinition(values);
    if (createFormDefinitionResponse.status === 201) {
      setOpen(false);
    }
  };

  const reset: MouseEventHandler<HTMLElement> = () => {
    formRef.current.resetFields();
  };

  return (
    <>
      <PageHeader
        title="Form Definitions"
        extra={[
          <Button key="1" type="primary" onClick={openNewForm}>
            New
          </Button>,
        ]}
      />
      <Table columns={columns} dataSource={formListData[0]} rowKey="id" />
      <Drawer
        title="New Form Definition"
        placement={'left'}
        onClose={closeNewForm}
        open={open}
      >
        <Form
          name="formDefinition"
          autoComplete="off"
          layout="vertical"
          onFinish={finish}
          ref={formRef}
        >
          <FormItem
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your form's name!" },
            ]}
          >
            <Input maxLength={100} showCount />
          </FormItem>

          <FormItem
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
            <InputTextArea showCount maxLength={250} />
          </FormItem>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <React.Fragment key={key}>
                    <TypographyTitle level={5} className="tw-mt-4">
                      Question #{index + 1}
                    </TypographyTitle>
                    <FormItem
                      {...restField}
                      label="Question"
                      name={[name, 'question']}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your question!',
                        },
                      ]}
                    >
                      <Input maxLength={150} showCount />
                    </FormItem>

                    <FormItem
                      label="Answer Type"
                      name={[name, 'answerType']}
                      rules={[
                        {
                          required: true,
                          message: "Please select question's answer type!",
                        },
                      ]}
                    >
                      <Select placeholder="Select an option">
                        <SelectOption value="string">String</SelectOption>
                        <SelectOption value="location">Location</SelectOption>
                        <SelectOption value="integer">Integer</SelectOption>
                        <SelectOption value="date">Date</SelectOption>
                        <SelectOption value="boolean">Boolean</SelectOption>
                      </Select>
                    </FormItem>
                    <Button
                      type="default"
                      onClick={() => remove(name)}
                      block
                      icon={<MinusCircleOutlined />}
                    >
                      Remove question
                    </Button>
                  </React.Fragment>
                ))}
                <Divider />
                <FormItem>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add question
                  </Button>
                </FormItem>
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
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </>
  );
};

export default Index;
