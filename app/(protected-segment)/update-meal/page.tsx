import styles from './update-meal.module.css';
import Link from 'next/link';
import Image from 'next/image';
import backSign from '@/app/ui/assets/back-sign.svg';
import MainContent from './main';

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
              {[].map(() => (
                <Food name={'Maçã'}>
                  <NutritionalData>
                    {[].map(() => (
                      <Macro amount={0.5} name={'Carbos'} />
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
