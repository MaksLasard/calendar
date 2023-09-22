/*
RTK Query - улучшение и упрощение написания кода для запросов к API

long polling - непрерывная подгрузка данных через определенный промежуток
	времени. По типу websocket
	
	const {
		data: posts,
		error,
		isLoading,
	} = postApi.useGetAllPostsQuery(5, {
		pollingInterval: 1000,
	})
	
	Нужно добавить в хук 2 параметра: 1 аргумент улетит в endpoint, 2 аргумент
		интервал через который будет производиться повторный запрос
		
	Если на сервере появились какие-то новые данные, то мы их получим и увидим в нашем
		интерфейсе уже обновленные данные

СУПЕР ВАЖНО!!!!!
	ОБЯЗАТЕЛЬ ПРОВЕРЬ АДРЕС ИМПОРТА import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
		ЕСЛИ ОН БУДЕТ ТАКИМ, ТО ХУКИ ДЛЯ РЕАКТА ГЕНЕРИРОВАТЬСЯ НЕ БУДУТ
		
		ОБЯЗАТЕЛЬНО ДОЛЖНО БЫТЬ ВОТ ТАК:
			import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

ЕСЛИ TS ПИШЕТ ЧТО ДАННЫЕ МОГУТ БЫТЬ UNDEFINED, НУЖНО ПРОСТО ДОБАВИТЬ ПРОВЕРКУ
	users && users.map()

	Краткий план:
		1. Создать api с минимум 1 endpoint
		2. Проверить откуда импортируеться createApi, и fetchBaseQuery
		3. Добавить в rootReducer наш api
		4. Добавить в store через middleware: getDefaultMiddleware наш api
		5. Использовать внутри компонента автосгенерированные хуки



	1. Создание API
		Нужно использовать функию createApi

		export const getAllUsers = createApi({})
		
		Для работы этой функции нам нужно передать ряд обязательныз опций
		
		- reducerPath: 'getAllUser' - некоторый уникальный ключ который будет однозначно определять
			текущий сервис
			
		- baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'})
			Нужно воспользоваться import функцией fetchBaseQuery и в нее передать ряд
				опций. Самый важный это baseUrl на который сервис будет отправлять запросы

		- endpoints - именно тут мы будем описывать все endpoints на которые мы будем
			отправлять запросы и как-то изменять наше состояние
			
			Это функция которая возвращает некоторый объект с endpoint
				С помощью которым мы будем возврщать какие-то данные
			
				endpoints: (build) => ({
					fetchAllUsers: build.query(),
				}),
			
				build.query() - для получения данных GET запрос
				build.mutation() - для изменения данных POST, PUT запросы

				Внутри endpoint нужно создать еще функцию query которая возвращает объект
	
				fetchAllUsers: build.query({
					query: () => ({}),
				}),
			
				query будет принимать параметры которые необходымы для запроса
					Наприме тело запроса, какие-то параметры, url и тд
					
					Тут мы указываем url до конкретного endpoint
					Он будет добавляться к базовому url

					endpoints: (build) => ({
						fetchAllUsers: build.query({
							query: () => ({
								url: '/users',
							}),
						}),
					}),

					Таким образом мы формируем некоторые endpoints
					Services api нужно именновать чтобы не повторялись названия с
						reducers иначе может быть конфликт
						
			Чтобы это заработало нужно добавить в reducers
				[userApi.reducerPath]: userApi.reducer,

				export const rootReducer = combineReducers({
					user: userReducers,
					auth: authReducer,
					[userApi.reducerPath]: userApi.reducer,
				})
				
			Также нужно добавить некоторую middleware
			
			1. При формировании store у нас есть middleware
				Это стрелочная функция, которая аргументом также принимает фукцию
					с помощью которой мы можем получить некоторый middleware которые
					уже подключены к redux toolkit
				
				middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),

				
				export const setupStore = () => {
					return configureStore({
						reducer: rootReducer,
						middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
					})
				}


Базовая настройка выполнена

	2. Идем в компонент и обращаемся к нашей api
		const {} = userApi.
		
		Тут есть несколько полей, но самое интересное это автосгенерированные хуки
			которые генерируются на основании тех endpoints которые мы описываем
		
		Нам нужен хук австосгенерированный на основе endpoint который мы создавали в api
			В даннос случае у нас сгенерируеться хук useGetAllUsersQuery
			
			Он в качестве параметров ожидает параметр который как-то будет использоваться
				в запросе. В нашем случае таких параметров нет поэтому передадим
				пустую строку
		
			const {data: users} = userApi.useGetAllUsersQuery('')
			
			То что возвращает это хук сразу деструктуризируем ряд полей которые
				нам возвращаються
				
				getAllUsers: build.query<IUsersData[], number>({
		
					1 аргумент - данные какого типа будут получены
					2 аргумент - тип аргумента который будет ожидать хук endpoint
		
		
		
	JSON-SERVER
		1. Это своеобразная база данных и все данные будут сохраняться в файлик db.json
			Нужно будет только поменять baseUrl на localhost:5000
			Перед эти написать скрипт чтобы json-server открывался на port:5000
				потому что наше приложение работает на post:3000
		
	Добавление данных с помощью query.mutation
		1. Принцип написания endpoint будет аналогичный
		
			createPost: build.mutation<IPosts, IPosts>({
				query: (post) => ({
					url: `/posts`,
					method: 'POST',
					body: post
				}),
			}),
		
			В качестве параметра принимаем post это объект который мы хотим
				сохранить в базу данных
		
			<IPosts, IPosts>
			1. Что получает (Тип объект который нам вернеться)
			2. Что принимает в качестве аргумента
			
			В опциях мы можем указывать селектор и получать определенные данные
		
			const [createPost, {}] = postApi.useCreatePostMutation()
			
			1. Элемент массива это функция которую мы можем вызвать чтобы произошла
				мутация
			2. Это объект в котором находятся поля isLoading, data и тд
		
		
	Мы можем не заботиться о том, что запросы у нас продублируются. И когда мы
		используем хук мы можем быть уверены, что если эти данные используются где-то
		еще, то лишний запрос у нас выполняться не будет и мы возьмем эти данные из
		хранилища и будем использовать там где нам необходимо
		
	В свою очередь RTK Query позаботиться о том чтобы эти данные закешировать и
		своевременно обновить если в этои будет необходимость
	
					url: `/posts`, - куда будет уходить запрос
					method: 'POST', - какой метод запроса будет использоваться
					body: post - что будет записываться в БД
									В нашем случае объект поста
						
	Пример:
			const [createPost, { isError }] = postApi.useCreatePostMutation()

			const handleCreate = async () => {
				const title = prompt()
				await createPost({ title, body: title } as IPosts)
			}

	На этом этапе мы уже можем добавлять новые посты в ассинхронном формате и они
		будут добавляться на сервер, но отображаться они не будут. Они будут
		отображаться только после обновления страницы
		
		Чтобы посты обновлялись в режиме реального времени нужно:
		
		
		Цель:
			Сделать так чтобы при создании объекта он сразу добавлялся в соответствующий
				список и нам не приходилось делать дополнительные махинации.
				Какие-то refetch, подгружать данные и т.д
		
		- По умолчанию RTK не знает куда нам необходимо этот объект добавить
			Для этого необходимо проставить определенные теги
			
			tagTypes: ['Post'],
				В данном случае у нас один тег, но мы также можем указать
					массив тегов если их много
					
		- Дальше мы должны указать что наш endpoint получения build.query
			занимаеться тем что работает с тегом post
			
			providesTags: (result) => ['Post'],
		
			Пример кода:
		
			getAllPosts: build.query<IPosts[], number>({
				query: (limit = 5) => ({
					url: `/posts`,
					params: {
						_limit: limit,
					},
				}),
				providesTags: (result) => ['Post'],
			}),
		
			Т.е у нас может быть несколько endpoints которые работают с разными
				данными и нам необходимо правильно эти endpoints сопоставить
		
			При получении данных мы указываем что этот endpoint обеспечивает
				доставку данных
		
			Пример:
		
			createPost: build.mutation<IPosts, IPosts>({
				query: (post) => ({
					url: `/posts`,
					method: 'POST',
					body: post,
				}),
				invalidatesTags: ['Post'],
			}),
		
			invalidatesTags: ['Post'],
				При создании поста мы указываем что эти данные становяться не
					актуальными и соответственно RTK Query должен эти данные получить
		
		
		Таким образом нам достаточно правильно сопоставить источник данных с
			endpoint который как-то эти данные изменяет
		
		const [createPost, { error: createError }] = postApi.useCreatePostMutation()
		
		Также мы можем обрабатывать и ошибку точно таким-же способом, и обрабатывать
			индикацию загрузки. В данной ситуации при загрузке данных у нас поле
			называеться error, и при создании поста у нас также поле называеться
			error
			
			{ error: createError } - таким образом через двоеточие необходимо
				менять название чтобы не было пересечений и мы могли в одном компоненте
				обрабатывать назные запросы
		
		const [createPost, { error: createError, isLoading: isCreateLoading }] = postApi.useCreatePostMutation()
		
		
		Реализация добавления поста и его удаление:
		
		Обновление поста:
			updatePost: build.mutation<IPosts, IPosts>({
				query: (post) => ({
					url: `/posts/${post.id}`, - добавили id поста который нужно обновить
					method: 'PUT', - метод для обновления
					body: post,
				}),
				invalidatesTags: ['Post'],
			}),
		
		Удаление поста:
			deletePost: build.mutation<IPosts, IPosts>({
				query: (post) => ({
					url: `/posts/${post.id}`, - добавили id поста который нужно удалить
					method: 'DELETE', - метод удаления
				}),
				invalidatesTags: ['Post'], - предыдущие данные становятся не актуальными
			}),
		
	С помощью RTK Query можно выполнять базовые операции:
		- Обработка ошибок
		- Обработка индикации загрузок
		- Данные кэшируются
		- Проверка что данные актуальны
		
		
		
		
*/
