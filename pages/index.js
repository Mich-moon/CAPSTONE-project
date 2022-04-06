
import React from 'react'
import Layout from '../components/layout'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../app/config/firebase.config'

import { Text, Box, Heading, HStack, Grid, GridItem, IconButton, Tooltip, SkeletonText } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import AlertContainer from '../components/home/AlertsContainer'
import PublicForumContiner from '../components/home/PublicForumContainer'
import SearchContainer from '../components/home/SearchContainer'
import NewButton from '../components/New'


const ButtonStyle = {
  fontSize: 'sm',
  spacing: 5,
  borderRadius: 10,
  color: 'teal.500',
  p: 10,
  py: 2,
  w: 'full',
  alignItems: 'center',
  transition: '.5s',
  justifyContent: 'center',
  _hover: {
    cursor: 'pointer',
    color: 'teal.700'
  }
}

export default function Home({ user, currentConnect }) {
  const [connect, setConnect] = React.useState(null)

  const handleSetConnect = () => {
    if (currentConnect) {
      getDoc(doc(firestore, `Locations/${currentConnect.location.id}`))
        .then(snapshot => {
          setConnect(snapshot.data())
        })
        .catch(error => alert(error.message))
    }
  }

  React.useEffect(() => {
    if (currentConnect) handleSetConnect()
  }, [currentConnect])




  return (
    <>
      <Layout user={user} currentTab={'home'} >
        <NewButton user={user} location={connect} />
        <Grid w={'full'} templateColumns={'repeat(12,1fr)'}>
          <GridItem p={2} colSpan={{ base: 12, md: 5, lg: 4 }} top={{ base: 'unset', lg: 70 }} position={{ base: 'unset', lg: 'sticky' }} h={'fit-content'} >


            <Box >
              <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'} borderRadius={10}>
                <Heading mb={2} size={'md'}>Hello, {user?.displayName}</Heading>
                <HStack spacing={'5px'} fontWeight={'medium'} fontSize={'sm'} alignItems={'center'} >
                  <FeatherIcon size={'16px'} icon={'map-pin'} />

                  {!connect ? <SkeletonText borderRadius={'full'} noOfLines={1} width={'50%'} /> : <Text>{connect ? `${connect.area} Connect` : ``}</Text>}

                  <Tooltip label={'More Connects'} >
                    <IconButton variant={'ghost'} size={'xs'} icon={<FeatherIcon icon={'more-horizontal'} />} />
                  </Tooltip>

                </HStack>
              </Box>
            </Box>

            <Box mt={5} boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.14)'} bgColor={'white'}>
              <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Public Forum'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'users'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Forums'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'message-circle'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >

                  <Tooltip label={'Alerts'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'airplay'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
              </Grid>
            </Box>


          </GridItem>

          <GridItem px={2} colSpan={{ base: 12, md: 7, lg: 5 }} >
            <AlertContainer my={5} />
            {connect ? <PublicForumContiner location={connect} my={5} user={user} /> : <></>}
          </GridItem>

          <GridItem px={2} top={70} position={'sticky'} height={'fit-content'} minH={'90vh'} display={{ base: 'none', md: 'none', lg: 'unset' }} colSpan={{ base: 0, md: 0, lg: 3 }}>
            <SearchContainer overflow={'scroll'} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  )
}



