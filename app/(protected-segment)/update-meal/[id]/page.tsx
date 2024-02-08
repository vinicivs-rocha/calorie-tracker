import backSign from '@/app/ui/assets/back-sign.svg';
import { getMealDataById } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddFoodButton from './add';
import AddedFoods from './added';
import ConfirmButton from './confirm';
import FieldInput from './field';
import Foods from './foods';
import Footer from './footer';
import Header from './header';
import Heading from './heading';
import Main from './main';
import MainContent from './main-content';
import MealDataContextProvider from './meal-provider';
import NameInput from './name';
import styles from './update-meal.module.css';

export default async function UpdateMealPage({
  params,
}: {
  params: { id: string };
}) {
  const mealInitialState = await getMealDataById(params.id);
  return (
    <div className={styles.page}>
      <MealDataContextProvider initialValue={mealInitialState}>
        <MainContent>
          <Header>
            <Link href='/home' className={styles.backSign}>
              <Image src={backSign} alt='' height={12} width={12} />
            </Link>
            <Heading>Altere sua refeição</Heading>
          </Header>
          <Main>
            <FieldInput label='Nome'>
              <NameInput />
            </FieldInput>
            <Foods>
              <AddedFoods />
              <AddFoodButton />
            </Foods>
          </Main>
        </MainContent>
        <Footer>
          <ConfirmButton text={'Alterar refeição'} mealId={params.id}/>
        </Footer>
      </MealDataContextProvider>
    </div>
  );
}
