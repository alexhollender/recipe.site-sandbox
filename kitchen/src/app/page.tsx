'use client';

import * as Mantine from '@mantine/core';
import * as React from 'react';

import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
  const [checked, setChecked] = React.useState(false);

  return (
    <Mantine.AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Mantine.AppShell.Header p="md">
        <Mantine.Flex gap="md" align="center">
          <Mantine.Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </Mantine.Flex>
      </Mantine.AppShell.Header>
      <Mantine.AppShell.Navbar p="md">Navbar</Mantine.AppShell.Navbar>
      <Mantine.AppShell.Main>
        <Mantine.Text size="xl" fw={700}>
          Recipe
        </Mantine.Text>
        <Mantine.TextInput label="Title" />
        <Mantine.Switch
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="I agree to sell my privacy"
        />
      </Mantine.AppShell.Main>
    </Mantine.AppShell>
  );
}
