import styles from './update-meal.module.css';
import Link from 'next/link';
import Image from 'next/image';
import backSign from '@/app/ui/assets/back-sign.svg';
import MainContent from './main-content';
import Header from './header';
import Heading from './heading';
import Main from './main';
import FieldInput from './field';
import NameInput from './name';
import Foods from './foods';
import AddedFoods from './added';
import Food from './food';
import NutritionalData from './nutritional-data';
import Macro from './macro';
import DeleteButton from './delete';
import AddFoodButton from './add';
import Footer from './footer';
import ConfirmButton from './confirm';

export default function UpdateMealPage() {
  return (
    <div className={styles.page}>
      <MainContent>
        <Header>
          <Link href='/home'>
            <Image src={backSign} alt='' height={12} width={12} />
          </Link>
          <Heading>Altere sua refeição</Heading>
        </Header>
        <Main>
          <FieldInput label='Nome'>
            <NameInput initialValue={'Almoço'} />
          </FieldInput>
          <Foods>
            <AddedFoods>
              {[].map((_, index) => (
                <Food name={'Maçã'} key={index}>
                  <NutritionalData>
                    {[].map((_, index) => (
                      <Macro amount={0.5} name={'Carbos'} key={index}/>
                    ))}
                  </NutritionalData>
                  <DeleteButton />
                </Food>
              ))}
            </AddedFoods>
            <AddFoodButton />
          </Foods>
        </Main>
      </MainContent>
      <Footer>
        <ConfirmButton text={'Alterar refeição'} />
      </Footer>
    </div>
  );
}
