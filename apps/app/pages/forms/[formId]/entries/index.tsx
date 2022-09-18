import type {
  FormEntryReponseData,
  ListFormEntriesResponse,
} from '@credix/api/types';
import { FormEntryAnswerView } from '@credix/app/components';
import { getFormEntries } from '@credix/app/utils';
import { PageHeader, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

export const FormEntries: React.FC = () => {
  const { query, back } = useRouter();
  const [formEntryListData, setFormEntryListData] =
    useState<ListFormEntriesResponse>({ formName: null, entries: [[], 0] });
  const [formEntryListLoading, setFormEntryListLoading] = useState(false);

  const columns = useMemo<ColumnsType<FormEntryReponseData>>(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Link href={`/forms/${query.formId}/entries/${record.id}`}>
            <a>View Entry</a>
          </Link>
        ),
      },
    ],
    [query.formId]
  );

  useEffect(() => {
    if (query.formId) {
      const fetchFormList = async () => {
        setFormEntryListLoading(true);
        const response = await getFormEntries(query.formId as string);
        if (response.status === 200) {
          setFormEntryListData(response.data);
        }
        setFormEntryListLoading(false);
      };

      fetchFormList();
    }
  }, [query.formId]);

  if (formEntryListLoading) return <p>Loading...</p>;

  return (
    <>
      <PageHeader onBack={back} title={formEntryListData.formName} />
      <Table
        columns={columns}
        dataSource={formEntryListData.entries[0]}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) =>
            record.answers.map((item, index) => {
              return <FormEntryAnswerView key={item.id} entry={item} />;
            }),
        }}
      />
    </>
  );
};

export default FormEntries;
