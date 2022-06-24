import React from 'react'
import SearchVoting from 'components/SearchVoting'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from '@material-tailwind/react'

const ElectorHome = () => {
  return (
    <Tabs value='votar' className='overflow-hidden'>
      <TabsHeader className='sticky top-0 rounded-none items-center'>
        <Tab value='votar'>Votar</Tab>
        <Tab value='integridad'>Comprobar integridad</Tab>
        <Tab value='verificar'>Verificar voto</Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value='votar'><SearchVoting /></TabPanel>
        <TabPanel value='integridad'>Comprobar integridad</TabPanel>
        <TabPanel value='verificar' className='flex justify-center'>Verificar voto</TabPanel>
      </TabsBody>
    </Tabs>
  )
}

export default ElectorHome
