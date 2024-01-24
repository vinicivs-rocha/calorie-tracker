import backSign from '@/app/ui/assets/back-sign.svg';
import Image from 'next/image';
import Link from 'next/link';
import AddFoodButton from './add';
import AddedFoods from './added';
import ConfirmButton from './confirm';
import DeleteButton from './delete';
import FieldInput from './field';
import Food from './food';
import Foods from './foods';
import Footer from './footer';
import Header from './header';
import Heading from './heading';
import Macro from './macro';
import Main from './main';
import MainContent from './main-content';
import NameInput from './name';
import NutritionalData from './nutritional-data';
import styles from './update-meal.module.css';
import MealDataContextProvider from './meal-provider';

// TODO - Add state
// TODO - Add mobile drag animation
export default function UpdateMealPage() {
  return (
    <div className={styles.page}>
      <MealDataContextProvider initialValue={{name: "Almoço", foods: []}}>
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
              <AddedFoods>
                {['Maçã'].map((name, index) => (
                  <Food key={index}>
                    <div className={styles.foodData}>
                      <h2 className={styles.foodName}>{name}</h2>
                      <NutritionalData>
                        {['Carbos', 'Proteínas', 'Gorduras'].map((name, index) => (
                          <Macro amount={0.5} name={name} key={index}/>
                        ))}
                      </NutritionalData>
                    </div>
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
      </MealDataContextProvider>
    </div>
  );
}
