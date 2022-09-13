// import styles from './index.module.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance, FormProps } from 'antd';
import {
  Button,
  Divider,
  Drawer,
  Form,
  Input,
  PageHeader,
  Select,
  Table,
  Typography,
} from 'antd';
import type { MouseEventHandler } from 'react';
import React, { createRef, useState } from 'react';

const columns: typeof Table.defaultProps.columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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
];
const data = [
  {
    key: '1',
    name: 'Form 1',
    description: '',
    numQuestions: 1,
  },
  {
    key: '2',
    name: 'Form 2',
    description: '',
    numQuestions: 2,
  },
  {
    key: '3',
    name: 'Form 3',
    description: '',
    numQuestions: 3,
  },
];

// Component shortcuts
const FormItem = Form.Item;
const SelectOption = Select.Option;
const TypographyTitle = Typography.Title;
const InputTextArea = Input.TextArea;

export const Index: React.FC = () => {
  const [open, setOpen] = useState(false);
  const formRef = createRef<FormInstance>();

  const openNewForm = () => {
    setOpen(true);
  };

  const closeNewForm = () => {
    setOpen(false);
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Received values of form:', values);
  };

  const onReset: MouseEventHandler<HTMLElement> = () => {
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
      <Table columns={columns} dataSource={data} />
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
          onFinish={onFinish}
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
                  <Button htmlType="button" onClick={onReset} block>
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
