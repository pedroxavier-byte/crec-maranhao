import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

function TabIcon({ name, color, size }: { name: IconName; color: string; size: number }) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarPosition: 'top', tabBarActiveTintColor: Colors.primary, tabBarInactiveTintColor: Colors.textLight, tabBarStyle: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border, elevation: 4, shadowOpacity: 0.1 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }, tabBarIndicatorStyle: { backgroundColor: Colors.primary, height: 3 }, tabBarScrollEnabled: true, tabBarItemStyle: { width: 90 } }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, size }) => <TabIcon name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="escolas/index" options={{ title: 'Escolas', tabBarIcon: ({ color, size }) => <TabIcon name="school-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="biblioteca/index" options={{ title: 'Biblioteca', tabBarIcon: ({ color, size }) => <TabIcon name="book-open-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="noticias/index" options={{ title: 'Notícias', tabBarIcon: ({ color, size }) => <TabIcon name="newspaper-variant-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="pesquisadores/index" options={{ title: 'Pessoas', tabBarIcon: ({ color, size }) => <TabIcon name="account-group-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="relatorios/index" options={{ title: 'Relatórios', tabBarIcon: ({ color, size }) => <TabIcon name="chart-bar" color={color} size={size} /> }} />
      <Tabs.Screen name="legislacao/index" options={{ title: 'Legislação', tabBarIcon: ({ color, size }) => <TabIcon name="gavel" color={color} size={size} /> }} />
      <Tabs.Screen name="busca/index" options={{ title: 'Buscar', tabBarIcon: ({ color, size }) => <TabIcon name="magnify" color={color} size={size} /> }} />
      <Tabs.Screen name="fopec/index" options={{ title: 'FOPEC-MA', tabBarIcon: ({ color, size }) => <TabIcon name="leaf" color={color} size={size} /> }} />
      <Tabs.Screen name="pronacampo/index" options={{ title: 'PRONACAMPO', tabBarIcon: ({ color, size }) => <TabIcon name="sprout" color={color} size={size} /> }} />
      <Tabs.Screen name="conec/index" options={{ title: 'CONEC', tabBarIcon: ({ color, size }) => <TabIcon name="hand-heart-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="censo-escolar/index" options={{ title: 'Censo Escolar', tabBarIcon: ({ color, size }) => <TabIcon name="chart-bar" color={color} size={size} /> }} />
      <Tabs.Screen name="admin/index" options={{ title: 'Admin', tabBarIcon: ({ color, size }) => <TabIcon name="shield-crown-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="escolas/[id]" options={{ href: null }} />
      <Tabs.Screen name="escolas/nova" options={{ href: null }} />
      <Tabs.Screen name="biblioteca/[id]" options={{ href: null }} />
      <Tabs.Screen name="noticias/[id]" options={{ href: null }} />
      <Tabs.Screen name="pesquisadores/[id]" options={{ href: null }} />
      <Tabs.Screen name="legislacao/[id]" options={{ href: null }} />
    </Tabs>
  );
}
