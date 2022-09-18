import type { GetFormEntryResponse } from '@credix/api/types';
import { FormEntryAnswerView } from '@credix/app/components';
import { getFormEntry } from '@credix/app/utils';
import { PageHeader } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const ViewFormEntry: React.FC = () => {
  const { query, back } = useRouter();
  const [formEntryData, setFormEntryData] =
    useState<GetFormEntryResponse>(null);
  const [formEntryLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (query.formId && query.entryId) {
      const fetchFormEntry = async () => {
        setFormLoading(true);
        const response = await getFormEntry(
          query.formId as string,
          query.entryId as string
        );
        if (response.status === 200) {
          setFormEntryData(response.data);
        }
        setFormLoading(false);
      };

      fetchFormEntry();
    }
  }, [query.formId, query.entryId]);

  if (!formEntryData) return null;
  if (formEntryLoading) return <p>Loading...</p>;

  return (
    <>
      <PageHeader onBack={back} title={formEntryData.formDefinition.name} />
      {formEntryData.answers.map((item, index) => {
        return <FormEntryAnswerView key={item.id} entry={item} />;
      })}
    </>
  );
};

export default ViewFormEntry;
