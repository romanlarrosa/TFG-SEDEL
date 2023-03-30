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
        <Tab value='integridad'>Comprobar votación</Tab>
        <Tab value='verificar'>Verificar voto</Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value='votar'>
          <SearchVoting
            link='vote/'
            action='Votar'
            helpText='Introduce el ID de la votación en la que desees participar'
          />
        </TabPanel>
        <TabPanel value='integridad'>
          <SearchVoting
            link='votings/view/'
            action='Comprobar votación'
            helpText='Introduce el ID de la votación que desees comprobar'
          />
        </TabPanel>
        <TabPanel value='verificar'>
          <SearchVoting
            link='vote/verify/'
            action='Verificar voto'
            helpText='Introduce el ID del voto que desees verficar.'
          />
        </TabPanel>
      </TabsBody>
    </Tabs>
  )
}

export default ElectorHome
